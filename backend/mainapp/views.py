from rest_framework import status, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response

from .models import Bookmark
from .serializers import BookmarkSerializer


class BookmarkViewSet(viewsets.ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    def get_queryset(self):
        category = self.request.query_params.get("category", None)
        if category:
            return Bookmark.objects.filter(category=category)
        return super().get_queryset()

    @action(detail=True, methods=["post"])
    def favorite(self, request, pk=None):
        bookmark = self.get_object()
        bookmark.favorite = not bookmark.favorite
        bookmark.save()
        return Response(
            {"status": "favorite status updated", "favorite": bookmark.favorite}
        )

    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except Bookmark.DoesNotExist:
            return Response(
                {"error": "Bookmark not found"}, status=status.HTTP_404_NOT_FOUND
            )


@api_view(["GET"])
def get_categories(request):
    categories = Bookmark.CATEGORY_CHOICES
    return Response([{"value": choice[0], "label": choice[1]} for choice in categories])
