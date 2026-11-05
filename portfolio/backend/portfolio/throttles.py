from rest_framework.throttling import AnonRateThrottle


class ContactRateThrottle(AnonRateThrottle):
    """Limits contact submissions per IP (rate set by CONTACT_THROTTLE_RATE)."""

    scope = "contact"
