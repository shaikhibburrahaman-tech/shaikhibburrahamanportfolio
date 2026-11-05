from django.urls import path

from . import views

urlpatterns = [
    path("profile/", views.ProfileView.as_view(), name="profile"),
    path("projects/", views.ProjectListView.as_view(), name="project-list"),
    path("projects/<slug:slug>/", views.ProjectDetailView.as_view(), name="project-detail"),
    path("education/", views.EducationView.as_view(), name="education"),
    path("skills/", views.SkillListView.as_view(), name="skills"),
    path("career/", views.CareerView.as_view(), name="career"),
    path("contact/", views.ContactView.as_view(), name="contact"),
]
