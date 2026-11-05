from django.db import models


class SiteProfile(models.Model):
    """Singleton with the owner's public details. Edit it in the admin."""

    full_name = models.CharField(max_length=100, default="Shaik Hibbur Rahaman")
    headline = models.CharField(max_length=150, default="Python Full-Stack Developer")
    intro = models.TextField(
        default=(
            "I'm an Electronics and Communication Engineering graduate who moved into software "
            "development. I build database-backed Python applications and I'm growing into a "
            "Python full-stack developer."
        )
    )
    career_objective = models.TextField(
        default=(
            "To begin my career as a software developer, apply my Python full-stack development "
            "skills to real-world projects, and continuously grow as an engineer."
        )
    )
    # Placeholders until real details are provided (clearly flagged in the UI).
    email = models.EmailField(default="your.email@example.com")
    github_url = models.URLField(default="https://github.com/your-username")
    linkedin_url = models.URLField(default="https://www.linkedin.com/in/your-username")
    resume_url = models.CharField(
        max_length=300, default="/resume.pdf", help_text="Path or URL of the resume PDF."
    )
    location = models.CharField(max_length=100, blank=True, default="")

    class Meta:
        verbose_name = "Site profile"
        verbose_name_plural = "Site profile"

    def __str__(self):
        return self.full_name

    def save(self, *args, **kwargs):
        self.pk = 1  # enforce a single row
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class Project(models.Model):
    CATEGORY_CHOICES = [("python", "Python"), ("web", "Web"), ("database", "Database")]

    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="python")
    short_description = models.CharField(max_length=300)
    description = models.TextField()
    features = models.JSONField(default=list, blank=True, help_text="List of strings.")
    technologies = models.JSONField(default=list, blank=True, help_text="List of strings.")
    image_url = models.URLField(blank=True, help_text="Screenshot URL. Leave blank for a placeholder.")
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class Education(models.Model):
    degree = models.CharField(max_length=150)
    branch = models.CharField(max_length=150)
    university = models.CharField(max_length=200)
    college_name = models.CharField(max_length=200, blank=True, help_text="Add once confirmed.")
    graduation_year = models.CharField(max_length=20, blank=True, help_text="Add once confirmed.")
    percentage = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name_plural = "Education"

    def __str__(self):
        return f"{self.degree} - {self.branch}"


class Skill(models.Model):
    LEVEL_CHOICES = [
        ("learning", "Learning"),
        ("beginner", "Beginner"),
        ("intermediate", "Intermediate"),
        ("proficient", "Proficient"),
        ("advanced", "Advanced"),
    ]
    CATEGORY_CHOICES = [
        ("language", "Languages"),
        ("frontend", "Frontend"),
        ("backend", "Backend & Data"),
        ("tools", "Tools"),
    ]

    name = models.CharField(max_length=80, unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default="beginner")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.name} ({self.level})"


class Entry(models.Model):
    """Small text items shown in lists on the Education and Career pages."""

    SECTION_CHOICES = [
        ("technical_learning", "Education: technical learning"),
        ("course", "Education: course"),
        ("certification", "Education: certification"),
        ("achievement", "Education: achievement"),
        ("interest", "Career: interest"),
        ("roadmap", "Career: learning roadmap step"),
        ("preparation", "Career: interview preparation"),
    ]

    section = models.CharField(max_length=30, choices=SECTION_CHOICES)
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=400, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["section", "order", "id"]
        verbose_name_plural = "Entries"

    def __str__(self):
        return f"[{self.section}] {self.title}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=150)
    message = models.TextField(max_length=2000)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name}: {self.subject}"
