from decimal import Decimal

from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

from shop.models import Product

from .models import Order


class OrderApiTests(APITestCase):
    def setUp(self):
        self.product = Product.objects.create(
            slug='arabica',
            name='Arabica',
            weight='1kg',
            price=18000,
            description='Coffee',
            details='Details',
            tasting_notes='Citrus',
            roast='Light roast',
            image='https://example.com/coffee.jpg',
            image_alt='Coffee',
        )
        self.user = get_user_model().objects.create_user(
            username='customer',
            email='account@example.com',
            password='StrongPassword!2026',
        )
        self.payload = {
            'customer_name': 'Coffee Customer',
            'customer_email': 'customer@example.com',
            'customer_phone': '+256700000000',
            'delivery_address': '1 Coffee Road',
            'delivery_city': 'Kampala',
            'items': [{'product_id': self.product.slug, 'quantity': 2}],
        }

    def test_order_uses_catalog_price_and_creates_reference(self):
        self.client.force_authenticate(self.user)
        response = self.client.post('/api/orders/', self.payload, format='json')
        self.assertEqual(response.status_code, 201)
        order = Order.objects.get()
        self.assertTrue(order.reference.startswith('LC-'))
        self.assertEqual(order.total, Decimal('36000'))
        self.assertEqual(order.user, self.user)
        self.assertEqual(order.customer_email, self.user.email)
        self.assertEqual(response.data['order_items'][0]['unit_price'], '18000')

    def test_order_rejects_invalid_quantity_and_duplicate_products(self):
        self.client.force_authenticate(self.user)
        invalid_quantity = {**self.payload, 'items': [{'product_id': self.product.slug, 'quantity': 100}]}
        duplicate_products = {
            **self.payload,
            'items': [
                {'product_id': self.product.slug, 'quantity': 1},
                {'product_id': self.product.slug, 'quantity': 1},
            ],
        }
        self.assertEqual(self.client.post('/api/orders/', invalid_quantity, format='json').status_code, 400)
        self.assertEqual(self.client.post('/api/orders/', duplicate_products, format='json').status_code, 400)
        self.assertEqual(Order.objects.count(), 0)

    def test_order_requires_authenticated_user(self):
        response = self.client.post('/api/orders/', self.payload, format='json')
        self.assertEqual(response.status_code, 401)
        self.assertEqual(Order.objects.count(), 0)
