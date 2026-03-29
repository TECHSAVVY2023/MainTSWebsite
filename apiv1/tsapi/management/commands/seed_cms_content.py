"""
Seed approved CmsItem rows for News & Updates, Courses, and Featured Projects.

Matches dashboard filter categories so Nuxt useCmsNews routing works:
  - News: category "News and update" (substring "news and update")
  - Courses: JSON contains "course" (from "Courses")
  - Projects: JSON contains "project" (from "Featured Projects")

Run: python manage.py seed_cms_content
Re-run replaces previous seed rows (content_id prefix seed-demo-).
"""

from __future__ import annotations

import json

from django.core.management.base import BaseCommand

from tsapi.models import CmsItem

SEED_PREFIX = "seed-demo-"

# Stable HTTPS images for cards (Unsplash)
IMG_CODE = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200"
IMG_EVENT = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200"
IMG_COURSE = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200"
IMG_TEAM = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
IMG_BUILD = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200"


def _f(obj: dict) -> str:
    return json.dumps(obj, ensure_ascii=False)


NEWS_ROWS = [
    {
        "content_id": f"{SEED_PREFIX}news-01",
        "title": "Code Camp Season 4 Kickoff",
        "authors": "TECH SAVVY Community",
        "filters": _f({"category": "News and update", "tagline": "Registration open for cohort workshops."}),
        "descriptions": "Season 4 opens with new tracks in frontend, backend, and community leadership.\n"
        "Members can RSVP for the opening night and mentor mixers.\n"
        "Scholarship slots are available for students in Misamis Occidental.",
        "links": ["https://techsavvies.space"],
        "images": [IMG_EVENT],
    },
    {
        "content_id": f"{SEED_PREFIX}news-02",
        "title": "School Implements New Online Assessment Flow",
        "authors": "Partner Schools Desk",
        "filters": _f({"category": "News and update", "tagline": "Pilot with three partner campuses."}),
        "descriptions": "A lightweight assessment workflow built with educators reduces grading time.\n"
        "TECH SAVVY mentors supported UX reviews and accessibility checks.",
        "links": ["https://example.org/edu-pilot"],
        "images": [IMG_TEAM],
    },
    {
        "content_id": f"{SEED_PREFIX}news-03",
        "title": "Demo Night: 12 Student Projects Live",
        "authors": "Events Team",
        "filters": _f({"category": "News and update", "tagline": "Hybrid audience — join online or on-site."}),
        "descriptions": "Projects span civic tech, small-business tools, and campus services.\n"
        "Judges from local industry will award mentorship hours and swag.\n"
        "Replay will be posted within 48 hours.",
        "links": ["https://example.org/demo-night"],
        "images": [IMG_CODE],
    },
    {
        "content_id": f"{SEED_PREFIX}news-04",
        "title": "Partnership: Open Source Club × TECH SAVVY",
        "authors": "Partnerships",
        "filters": _f({"category": "News and update", "tagline": "Monthly contribution sprints."}),
        "descriptions": "We are pairing maintainers with contributors for good-first-issue Fridays.\n"
        "Beginners get onboarding docs and live office hours.",
        "links": ["https://github.com"],
        "images": [IMG_TEAM],
    },
    {
        "content_id": f"{SEED_PREFIX}news-05",
        "title": "Health & Safety Reminder for Onsite Labs",
        "authors": "Operations",
        "filters": _f({"category": "News and update", "tagline": "Updated venue guidelines."}),
        "descriptions": "Please hydrate, mask when requested, and sign in at the front desk.\n"
        "Emergency contacts are posted in each lab room.",
        "links": [],
        "images": [IMG_BUILD],
    },
]

COURSE_ROWS = [
    {
        "content_id": f"{SEED_PREFIX}course-01",
        "title": "Frontend Fundamentals",
        "authors": "TECH SAVVY Mentors",
        "filters": _f(
            {
                "category": "Courses",
                "tagline": "HTML, CSS, JavaScript, and component thinking.",
                "course_level": "Beginner",
                "course_duration": "8 weeks",
                "course_type": "Hybrid",
            }
        ),
        "descriptions": "Build responsive pages from scratch.\n"
        "Learn semantic HTML, flexbox, and modern ES modules.\n"
        "Capstone: a small multi-page site deployed to static hosting.",
        "links": ["https://developer.mozilla.org"],
        "images": [IMG_COURSE],
    },
    {
        "content_id": f"{SEED_PREFIX}course-02",
        "title": "API Design with Django REST",
        "authors": "Backend Guild",
        "filters": _f(
            {
                "category": "Courses",
                "tagline": "Serializers, viewsets, and auth patterns.",
                "course_level": "Intermediate",
                "course_duration": "6 weeks",
                "course_type": "Online",
            }
        ),
        "descriptions": "Design clean REST APIs with pagination and filtering.\n"
        "Covers JWT basics and testing with pytest-django.",
        "links": ["https://www.django-rest-framework.org"],
        "images": [IMG_CODE],
    },
    {
        "content_id": f"{SEED_PREFIX}course-03",
        "title": "Fullstack Web Apps with Nuxt",
        "authors": "Fullstack Track",
        "filters": _f(
            {
                "category": "Courses",
                "tagline": "Vue 3, Nitro, and deployment.",
                "course_level": "Intermediate",
                "course_duration": "10 weeks",
                "course_type": "Hybrid",
            }
        ),
        "descriptions": "Ship a full app with SSR, API routes, and environment-based config.\n"
        "Popular and essential badges available for standout projects.",
        "links": ["https://nuxt.com"],
        "images": [IMG_COURSE],
    },
    {
        "content_id": f"{SEED_PREFIX}course-04",
        "title": "DevOps Basics for Developers",
        "authors": "Platform Team",
        "filters": _f(
            {
                "category": "Courses",
                "tagline": "CI, containers, and observability intro.",
                "course_level": "Beginner",
                "course_duration": "4 weeks",
                "course_type": "Online",
            }
        ),
        "descriptions": "GitHub Actions, Docker intro, and reading logs without panic.\n"
        "You will ship one pipeline for a sample service.",
        "links": ["https://docs.github.com/actions"],
        "images": [IMG_BUILD],
    },
    {
        "content_id": f"{SEED_PREFIX}course-05",
        "title": "UI Engineering & Accessibility",
        "authors": "Design Systems Crew",
        "filters": _f(
            {
                "category": "Courses",
                "tagline": "WCAG-focused patterns and testing.",
                "course_level": "Advanced",
                "course_duration": "5 weeks",
                "course_type": "Onsite",
            }
        ),
        "descriptions": "Keyboard flows, color contrast, and screen reader sanity checks.\n"
        "Bring your own component library or use our starter kit.",
        "links": ["https://www.w3.org/WAI/"],
        "images": [IMG_TEAM],
    },
]

PROJECT_ROWS = [
    {
        "content_id": f"{SEED_PREFIX}project-01",
        "title": "Barangay Request Tracker",
        "authors": "Civic Tech Cohort",
        "filters": _f(
            {
                "category": "Featured Projects",
                "tagline": "Digitize service requests for a local barangay.",
                "project_client": "LGUs pilot",
                "project_status": "Ongoing",
                "project_year": "2026",
            }
        ),
        "descriptions": "Queue management and SMS reminders for residents.\n"
        "Stack: Nuxt + Django + SQLite for the pilot.",
        "links": ["https://example.org/barangay-tracker"],
        "images": [IMG_BUILD],
    },
    {
        "content_id": f"{SEED_PREFIX}project-02",
        "title": "Campus Lost & Found Portal",
        "authors": "Student Developers",
        "filters": _f(
            {
                "category": "Featured Projects",
                "tagline": "Photo uploads and claim workflow.",
                "project_client": "State college partner",
                "project_status": "Completed",
                "project_year": "2025",
            }
        ),
        "descriptions": "Reduced duplicate posts and improved moderation time by 40%.\n"
        "Open-sourced under MIT.",
        "links": ["https://example.org/lost-found"],
        "images": [IMG_EVENT],
    },
    {
        "content_id": f"{SEED_PREFIX}project-03",
        "title": "Small Business Inventory Lite",
        "authors": "Mentor Studio",
        "filters": _f(
            {
                "category": "Featured Projects",
                "tagline": "Offline-first POS companion.",
                "project_client": "Local MSME collective",
                "project_status": "Ongoing",
                "project_year": "2026",
            }
        ),
        "descriptions": "Barcode scanning and daily summaries on low-bandwidth devices.\n"
        "Training videos in Cebuano and English.",
        "links": ["https://example.org/inventory-lite"],
        "images": [IMG_CODE],
    },
    {
        "content_id": f"{SEED_PREFIX}project-04",
        "title": "Community Learning Map",
        "authors": "Maps & Data Team",
        "filters": _f(
            {
                "category": "Featured Projects",
                "tagline": "Where to study, meet, and get help.",
                "project_client": "TECH SAVVY",
                "project_status": "Completed",
                "project_year": "2025",
            }
        ),
        "descriptions": "Aggregates study halls, labs, and event venues with hours and Wi‑Fi notes.\n"
        "Built with Leaflet and community-verified pins.",
        "links": ["https://openstreetmap.org"],
        "images": [IMG_TEAM],
    },
    {
        "content_id": f"{SEED_PREFIX}project-05",
        "title": "Disaster Preparedness Checklist App",
        "authors": "Resilience Working Group",
        "filters": _f(
            {
                "category": "Featured Projects",
                "tagline": "Household kits and evacuation reminders.",
                "project_client": "NGO partner",
                "project_status": "Ongoing",
                "project_year": "2026",
            }
        ),
        "descriptions": "Localized checklists and printable PDFs per region.\n"
        "Integrates public alert RSS where available.",
        "links": ["https://example.org/prep-checklist"],
        "images": [IMG_BUILD],
    },
]


class Command(BaseCommand):
    help = "Insert 5+5+5 approved CMS items (news, courses, featured projects)."

    def add_arguments(self, parser):
        parser.add_argument(
            "--no-clear",
            action="store_true",
            help="Do not delete existing seed-demo- rows first (may duplicate content_id).",
        )

    def handle(self, *args, **options):
        if not options["no_clear"]:
            deleted, _ = CmsItem.objects.filter(content_id__startswith=SEED_PREFIX).delete()
            if deleted:
                self.stdout.write(self.style.WARNING(f"Removed {deleted} previous seed row(s)."))

        rows = NEWS_ROWS + COURSE_ROWS + PROJECT_ROWS
        for row in rows:
            CmsItem.objects.create(
                content_id=row["content_id"],
                title=row["title"],
                authors=row["authors"],
                filters=row["filters"],
                descriptions=row["descriptions"],
                approval_status=CmsItem.APPROVAL_APPROVED,
                links=row.get("links") or [],
                files=[],
                images=row.get("images") or [],
                logs=[],
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"Created {len(rows)} approved CMS items "
                f"({len(NEWS_ROWS)} news, {len(COURSE_ROWS)} courses, {len(PROJECT_ROWS)} projects)."
            )
        )
