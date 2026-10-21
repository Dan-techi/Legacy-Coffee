from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

from .models import Product, Review, WishlistItem


class ShopApiTests(APITestCase):
    def setUp(self):
        self.product = Product.objects.create(
            slug='single-origin-arabica',
            name='Single Origin Arabica',
            weight='1kg',
            price=18,
            description='Bright fruity coffee.',
            details='Sourced in Western Uganda.',
            tasting_notes='Citrus and honey',
            roast='Light roast',
            image='https://example.com/coffee.jpg',
            image_alt='Coffee',
        )
        self.user = get_user_model().objects.create_user(
            username='customer',
            email='customer@example.com',
            password='StrongPassword!2026',
        )

    def test_products_are_public_and_use_frontend_id_field(self):
        response = self.client.get('/api/shop/products/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['results'][0]['id'], self.product.slug)
        self.assertEqual(response.data['results'][0]['price'], '18')

    def test_review_creation_requires_auth_and_includes_rating(self):
        payload = {'product': self.product.slug, 'rating': 5, 'text': 'Excellent coffee.'}
        self.assertEqual(self.client.post('/api/shop/reviews/', payload).status_code, 401)

        self.client.force_authenticate(self.user)
        response = self.client.post('/api/shop/reviews/', payload)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Review.objects.get().rating, 5)

    def test_wishlist_is_private_and_deduplicated(self):
        self.assertEqual(self.client.get('/api/shop/wishlist/').status_code, 401)
        self.client.force_authenticate(self.user)
        payload = {'product_id': self.product.slug}
        self.assertEqual(self.client.post('/api/shop/wishlist/', payload).status_code, 201)
        self.assertEqual(self.client.post('/api/shop/wishlist/', payload).status_code, 200)
        self.assertEqual(WishlistItem.objects.count(), 1)
        self.assertEqual(self.client.delete(f'/api/shop/wishlist/{self.product.slug}/').status_code, 204)
