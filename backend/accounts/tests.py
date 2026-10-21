from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase


class AuthenticationApiTests(APITestCase):
    def test_registration_creates_token_and_user(self):
        response = self.client.post('/api/auth/register/', {
            'username': 'coffee-customer',
            'email': 'customer@example.com',
            'password': 'StrongPassword!2026',
            'first_name': 'Coffee',
        })

        self.assertEqual(response.status_code, 201)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['user']['email'], 'customer@example.com')
        self.assertTrue(get_user_model().objects.filter(email='customer@example.com').exists())

    def test_login_and_profile_require_valid_credentials(self):
        user = get_user_model().objects.create_user(
            username='customer',
            email='customer@example.com',
            password='StrongPassword!2026',
        )
        response = self.client.post('/api/auth/login/', {
            'email': user.email,
            'password': 'StrongPassword!2026',
        })
        self.assertEqual(response.status_code, 200)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {response.data['token']}")
        self.assertEqual(self.client.get('/api/auth/me/').status_code, 200)

    def test_profile_requires_authentication(self):
        self.assertEqual(self.client.get('/api/auth/me/').status_code, 401)
