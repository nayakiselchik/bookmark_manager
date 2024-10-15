from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import BookmarkViewSet, get_categories

router = DefaultRouter()
router.register(r"bookmarks", BookmarkViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("categories/", get_categories, name="categories"),
]
