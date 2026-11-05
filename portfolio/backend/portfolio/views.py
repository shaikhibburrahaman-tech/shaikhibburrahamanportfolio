from django.db.models import Q
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContactMessage, Education, Entry, Project, Skill, SiteProfile
from .serializers import (
    ContactMessageSerializer, EducationSerializer, EntrySerializer,
    ProjectSerializer, SiteProfileSerializer, SkillSerializer,
)
from .throttles import ContactRateThrottle


def entries(section):
    return EntrySerializer(Entry.objects.filter(section=section), many=True).data


class ProfileView(APIView):
    def get(self, request):
        return Response(SiteProfileSerializer(SiteProfile.load()).data)


class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Project.objects.filter(is_published=True)
        category = self.request.query_params.get("category")
        if category:
            qs = qs.filter(category=category)
        search = self.request.query_params.get("search")
        if search:
            qs = qs.filter(Q(title__icontains=search) | Q(short_description__icontains=search))
        return qs


class ProjectDetailView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(is_published=True)
    lookup_field = "slug"


class EducationView(APIView):
    def get(self, request):
        return Response({
            "education": EducationSerializer(Education.objects.all(), many=True).data,
            "technical_learning": entries("technical_learning"),
            "courses": entries("course"),
            "certifications": entries("certification"),
            "achievements": entries("achievement"),
        })


class SkillListView(generics.ListAPIView):
    serializer_class = SkillSerializer
    queryset = Skill.objects.all()
    pagination_class = None


class CareerView(APIView):
    def get(self, request):
        return Response({
            "profile": SiteProfileSerializer(SiteProfile.load()).data,
            "skills": SkillSerializer(Skill.objects.all(), many=True).data,
            "interests": entries("interest"),
            "roadmap": entries("roadmap"),
            "preparation": entries("preparation"),
        })


class ContactView(APIView):
    throttle_classes = [ContactRateThrottle]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = dict(serializer.validated_data)
        if data.pop("website", ""):
            # Honeypot filled: pretend success, store nothing.
            return Response({"detail": "Thanks! Your message has been sent."}, status=status.HTTP_201_CREATED)
        ip = ContactRateThrottle().get_ident(request)  # respects NUM_PROXIES
        ContactMessage.objects.create(ip_address=ip, **data)
        return Response({"detail": "Thanks! Your message has been sent."}, status=status.HTTP_201_CREATED)
