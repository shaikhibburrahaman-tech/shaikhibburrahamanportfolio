from django.contrib import admin
from django.urls import include, path

admin.site.site_header = "Portfolio Admin"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Manage portfolio content"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("portfolio.urls")),
]
