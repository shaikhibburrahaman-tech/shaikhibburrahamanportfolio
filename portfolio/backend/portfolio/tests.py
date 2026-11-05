from django.core.cache import cache
from django.core.management import call_command
from django.test import override_settings
from rest_framework.test import APITestCase

from .models import ContactMessage, Project

VALID = {
    "name": "Asha Recruiter",
    "email": "asha@example.com",
    "subject": "Fresher opening",
    "message": "We would like to discuss a junior developer role with you.",
}


class PublicApiTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        call_command("seed_portfolio", verbosity=0)

    def test_project_list(self):
        res = self.client.get("/api/projects/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.json()), 3)

    def test_project_filter_by_category(self):
        res = self.client.get("/api/projects/?category=web")
        self.assertEqual([p["slug"] for p in res.json()], ["calculator-application"])

    def test_unpublished_projects_hidden(self):
        Project.objects.filter(slug="calculator-application").update(is_published=False)
        self.assertEqual(self.client.get("/api/projects/calculator-application/").status_code, 404)
        self.assertEqual(len(self.client.get("/api/projects/").json()), 2)

    def test_project_detail(self):
        res = self.client.get("/api/projects/supermarket-billing-system/")
        self.assertEqual(res.status_code, 200)
        self.assertIn("MySQL", res.json()["technologies"])

    def test_education(self):
        data = self.client.get("/api/education/").json()
        self.assertEqual(data["education"][0]["percentage"], "57%")
        self.assertEqual(data["certifications"], [])  # nothing invented

    def test_skills_use_levels_not_percentages(self):
        skills = {s["name"]: s for s in self.client.get("/api/skills/").json()}
        self.assertEqual(skills["Python"]["level"], "intermediate")
        self.assertEqual(skills["JavaScript"]["level"], "intermediate")
        self.assertNotIn("percentage", skills["Python"])

    def test_career(self):
        data = self.client.get("/api/career/").json()
        self.assertIn("career_objective", data["profile"])
        self.assertTrue(data["roadmap"])

    def test_profile(self):
        self.assertEqual(self.client.get("/api/profile/").json()["full_name"], "Shaik Hibbur Rahaman")


class ContactTests(APITestCase):
    def setUp(self):
        cache.clear()

    def test_valid_submission_is_saved(self):
        res = self.client.post("/api/contact/", VALID, format="json")
        self.assertEqual(res.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_missing_fields_rejected(self):
        res = self.client.post("/api/contact/", {"name": "A"}, format="json")
        self.assertEqual(res.status_code, 400)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_invalid_email_rejected(self):
        res = self.client.post("/api/contact/", {**VALID, "email": "nope"}, format="json")
        self.assertEqual(res.status_code, 400)
        self.assertIn("email", res.json())

    def test_html_is_stripped(self):
        self.client.post("/api/contact/", {**VALID, "message": "<script>alert(1)</script>Hello there, nice work!"}, format="json")
        self.assertNotIn("<script>", ContactMessage.objects.get().message)

    def test_newline_in_subject_rejected(self):
        res = self.client.post("/api/contact/", {**VALID, "subject": "Hi\r\nBcc: x@y.com"}, format="json")
        self.assertEqual(res.status_code, 400)

    def test_too_many_links_rejected(self):
        spam = "http://a.com http://b.com http://c.com buy now please"
        res = self.client.post("/api/contact/", {**VALID, "message": spam}, format="json")
        self.assertEqual(res.status_code, 400)

    def test_honeypot_silently_discarded(self):
        res = self.client.post("/api/contact/", {**VALID, "website": "http://spam.test"}, format="json")
        self.assertEqual(res.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_get_not_allowed(self):
        self.assertEqual(self.client.get("/api/contact/").status_code, 405)

    def test_rate_limited(self):
        with override_settings():
            from portfolio.throttles import ContactRateThrottle

            ContactRateThrottle.THROTTLE_RATES = {**ContactRateThrottle.THROTTLE_RATES, "contact": "2/hour"}
            try:
                codes = [self.client.post("/api/contact/", VALID, format="json").status_code for _ in range(3)]
            finally:
                ContactRateThrottle.THROTTLE_RATES = {**ContactRateThrottle.THROTTLE_RATES, "contact": "5/hour"}
        self.assertEqual(codes, [201, 201, 429])
