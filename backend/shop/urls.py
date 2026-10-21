from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ProductViewSet, ReviewListCreateView, WishlistView

router = DefaultRouter()
router.register('products', ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
    path('reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
    path('wishlist/', WishlistView.as_view(), name='wishlist'),
    path('wishlist/<slug:product_slug>/', WishlistView.as_view(), name='wishlist-detail'),
]
