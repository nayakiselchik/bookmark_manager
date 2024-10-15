from django.db import models


class Bookmark(models.Model):
    CATEGORY_CHOICES = (
        ("work", "Work"),
        ("study", "Study"),
        ("entertainment", "Entertainment"),
        ("uni", "Uni"),
    )

    title = models.CharField(max_length=255)
    url = models.URLField()
    category = models.CharField(
        max_length=50, choices=CATEGORY_CHOICES, blank=True, null=True
    )
    favorite = models.BooleanField(default=False)

    def __str__(self):
        return self.title
