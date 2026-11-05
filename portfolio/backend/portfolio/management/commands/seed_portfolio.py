"""Load starter content. Safe to re-run: existing rows are updated by slug/name."""
from django.core.management.base import BaseCommand

from portfolio.models import Education, Entry, Project, Skill, SiteProfile

PLACEHOLDER_GH = "https://github.com/your-username"

PROJECTS = [
    {
        "slug": "supermarket-billing-system",
        "title": "Supermarket Billing System",
        "category": "database",
        "short_description": "Python and MySQL billing application with inventory and transaction handling.",
        "description": (
            "A billing application for a supermarket, built with Python and a SQL/MySQL database. "
            "It manages the product inventory, processes customer transactions and handles billing "
            "operations, with the data stored in the database."
        ),
        "features": [
            "Product inventory management",
            "Customer transaction processing",
            "Billing operations",
            "Database integration with SQL/MySQL",
        ],
        "technologies": ["Python", "SQL", "MySQL"],
        "github_url": f"{PLACEHOLDER_GH}/supermarket-billing-system",
        "live_url": "",
        "is_featured": True,
        "order": 1,
    },
    {
        "slug": "vegetable-billing-system",
        "title": "Vegetable Billing System",
        "category": "database",
        "short_description": "Python and MySQL app for vegetable pricing, stock and billing records.",
        "description": (
            "A billing application for a vegetable shop, built with Python and MySQL. It handles "
            "product pricing and stock management, and keeps billing and transaction records."
        ),
        "features": [
            "Product pricing and stock management",
            "Billing and transaction records",
        ],
        "technologies": ["Python", "MySQL"],
        "github_url": f"{PLACEHOLDER_GH}/vegetable-billing-system",
        "live_url": "",
        "is_featured": True,
        "order": 2,
    },
    {
        "slug": "calculator-application",
        "title": "Calculator Application",
        "category": "web",
        "short_description": "Responsive calculator built with HTML, CSS and JavaScript.",
        "description": (
            "A calculator web application with a responsive interface and interactive calculations, "
            "built with HTML, CSS and JavaScript."
        ),
        "features": ["Responsive calculator interface", "Interactive calculations"],
        "technologies": ["HTML", "CSS", "JavaScript"],
        "github_url": f"{PLACEHOLDER_GH}/calculator-application",
        "live_url": "https://your-username.github.io/calculator-application",
        "is_featured": False,
        "order": 3,
    },
]

# Levels: Python, SQL/MySQL and JavaScript are intermediate (confirmed by the owner).
# The rest are starting values: adjust them in Django admin -> Skills.
SKILLS = [
    ("Python", "language", "intermediate", 1),
    ("SQL and MySQL", "backend", "intermediate", 2),
    ("JavaScript", "language", "intermediate", 3),
    ("HTML and CSS", "frontend", "beginner", 4),
    ("Bootstrap", "frontend", "beginner", 5),
    ("Django", "backend", "beginner", 6),
    ("React.js", "frontend", "beginner", 7),
    ("REST APIs", "backend", "beginner", 8),
    ("Git and GitHub", "tools", "beginner", 9),
]

ENTRIES = [
    ("technical_learning", "Python programming", "Core language used in the billing system projects.", 1),
    ("technical_learning", "SQL and MySQL", "Database design and queries for inventory and billing data.", 2),
    ("technical_learning", "Web fundamentals", "HTML, CSS and JavaScript, applied in the calculator project.", 3),
    ("technical_learning", "Full-stack frameworks", "Django, Django REST Framework and React.js.", 4),
    ("interest", "Python full-stack development", "Building complete applications from database to user interface.", 1),
    ("interest", "Backend and API development", "Designing clean REST APIs with Django.", 2),
    ("interest", "Database-driven applications", "Practical systems such as billing and inventory.", 3),
    ("roadmap", "Strengthen Django and REST APIs", "Build more projects with authentication and deployment.", 1),
    ("roadmap", "Grow React.js skills", "Component design, state management and API integration.", 2),
    ("roadmap", "Practise data structures and algorithms", "Regular problem solving in Python.", 3),
    ("roadmap", "Use Git and GitHub daily", "Version control and open collaboration habits.", 4),
    ("preparation", "Revise Python and SQL fundamentals", "", 1),
    ("preparation", "Practise coding problems", "", 2),
    ("preparation", "Prepare to explain each project", "Design choices, database schema and challenges.", 3),
    ("preparation", "Continuous learning", "Keep building and reading to improve steadily.", 4),
]


class Command(BaseCommand):
    help = "Seed the portfolio with starter content."

    def handle(self, *args, **options):
        SiteProfile.load()
        for data in PROJECTS:
            slug = data["slug"]
            Project.objects.update_or_create(slug=slug, defaults={k: v for k, v in data.items() if k != "slug"})
        for name, category, level, order in SKILLS:
            Skill.objects.update_or_create(name=name, defaults={"category": category, "level": level, "order": order})
        Education.objects.update_or_create(
            degree="Bachelor of Technology (B.Tech)",
            branch="Electronics and Communication Engineering (ECE)",
            defaults={
                "university": "JNTU-GV, Vizianagaram",
                "percentage": "57%",
                "description": "Completed engineering in ECE before moving into software development.",
                "order": 1,
            },
        )
        for section, title, desc, order in ENTRIES:
            Entry.objects.update_or_create(
                section=section, title=title, defaults={"description": desc, "order": order}
            )
        self.stdout.write(self.style.SUCCESS("Portfolio content seeded."))
