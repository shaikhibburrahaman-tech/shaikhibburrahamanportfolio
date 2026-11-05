import re

from django.utils.html import strip_tags
from rest_framework import serializers

from .models import ContactMessage, Education, Entry, Project, Skill, SiteProfile

CONTROL_CHARS = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")
URL_PATTERN = re.compile(r"(https?://|www\.)", re.IGNORECASE)


class SiteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteProfile
        exclude = ["id"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id", "title", "slug", "category", "short_description", "description",
            "features", "technologies", "image_url", "github_url", "live_url", "is_featured",
        ]


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        exclude = ["order"]


class SkillSerializer(serializers.ModelSerializer):
    level_label = serializers.CharField(source="get_level_display", read_only=True)

    class Meta:
        model = Skill
        fields = ["id", "name", "category", "level", "level_label"]


class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ["id", "title", "description"]


class ContactMessageSerializer(serializers.ModelSerializer):
    # Honeypot: real users never see or fill this field.
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = ContactMessage
        fields = ["name", "email", "subject", "message", "website"]
        extra_kwargs = {
            "name": {"min_length": 2, "max_length": 100},
            "subject": {"min_length": 3, "max_length": 150},
            "message": {"min_length": 10, "max_length": 2000},
        }

    @staticmethod
    def _clean(value):
        return CONTROL_CHARS.sub("", strip_tags(value)).strip()

    def validate_name(self, value):
        value = self._clean(value)
        if "\n" in value or "\r" in value or len(value) < 2:
            raise serializers.ValidationError("Please enter a valid name.")
        return value

    def validate_subject(self, value):
        value = self._clean(value)
        if "\n" in value or "\r" in value or len(value) < 3:
            raise serializers.ValidationError("Please enter a valid subject (single line).")
        return value

    def validate_email(self, value):
        value = value.strip().lower()
        if "\n" in value or "\r" in value:
            raise serializers.ValidationError("Enter a valid email address.")
        return value

    def validate_message(self, value):
        value = self._clean(value)
        if len(value) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters.")
        if len(URL_PATTERN.findall(value)) > 2:
            raise serializers.ValidationError("Please include at most two links in your message.")
        return value
