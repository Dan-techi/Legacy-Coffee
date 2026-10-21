from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase


class DashboardApiTests(APITestCase):
    def test_dashboard_is_staff_only(self):
        self.assertEqual(self.client.get('/api/dashboard/').status_code, 401)
        customer = get_user_model().objects.create_user(
            username='customer',
            email='customer@example.com',
            password='StrongPassword!2026',
        )
        self.client.force_authenticate(customer)
        self.assertEqual(self.client.get('/api/dashboard/').status_code, 403)

    def test_staff_can_read_summary(self):
        staff = get_user_model().objects.create_user(
            username='staff',
            email='staff@example.com',
            password='StrongPassword!2026',
            is_staff=True,
        )
        self.client.force_authenticate(staff)
        response = self.client.get('/api/dashboard/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('pending_orders', response.data)
