from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Bookmark

User = get_user_model()


class BookmarkAPITests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        refresh = RefreshToken.for_user(self.user)
        self.token = str(refresh.access_token)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

        self.bookmark1 = Bookmark.objects.create(
            title="Example", url="http://example.com", category="work", favorite=False
        )
        self.bookmark2 = Bookmark.objects.create(
            title="Test", url="http://test.com", category="study", favorite=True
        )

    def test_get_bookmark_list(self):
        response = self.client.get('/api/bookmarks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_get_single_bookmark(self):
        response = self.client.get(f'/api/bookmarks/{self.bookmark1.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.bookmark1.title)

    def test_get_non_existent_bookmark(self):
        response = self.client.get('/api/bookmarks/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_bookmark(self):
        data = {
            "title": "New Bookmark",
            "url": "http://newbookmark.com",
            "category": "entertainment",
            "favorite": False
        }
        response = self.client.post('/api/bookmarks/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Bookmark.objects.count(), 3)

    def test_create_invalid_bookmark(self):
        data = {
            "title": "",
            "url": "invalid-url",
            "category": "work",
            "favorite": False
        }
        response = self.client.post('/api/bookmarks/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_toggle_favorite(self):
        response = self.client.post(f'/api/bookmarks/{self.bookmark1.id}/favorite/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.bookmark1.refresh_from_db()
        self.assertTrue(self.bookmark1.favorite)

    def test_get_categories(self):
        response = self.client.get('/api/categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(isinstance(response.data, list)) 

