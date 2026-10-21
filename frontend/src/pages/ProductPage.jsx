import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { products, formatPrice } from '../data/products.js'
import { useCart } from '../context/useCart.js'
import ProductImage from '../components/ProductImage.jsx'

export default function ProductPage() {
  const { productId } = useParams()
  const product = products.find(item => item.id === productId)
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [showMore, setShowMore] = useState(false)

  if (!product) {
    return (
      <section className="px-6 py-20 text-center">
        <h1 className="mb-3 text-3xl font-bold text-primary">Product not found</h1>
        <p className="mb-6 text-brown">That coffee may have moved off our shelves.</p>
        <Link to="/shop" className="rounded bg-primary px-6 py-3 font-semibold text-white">Back to shop</Link>
      </section>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    navigate('/cart')
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigate('/checkout')
  }

  return (
    <section className="bg-[#fffdfa] px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-brown/60 sm:mb-5">
          <Link to="/shop" className="font-medium transition-colors hover:text-primary">Shop</Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-brown" aria-current="page">{product.name}</span>
        </nav>

        <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-peach-light shadow-sm">
            <ProductImage product={product} className="transition-transform duration-700 hover:scale-[1.03]" />
            <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brown shadow-sm backdrop-blur sm:left-6 sm:top-6">
              {product.weight}
            </span>
          </div>

          <div className="py-1">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-brown/60">{product.roast}</p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-brown sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-brown/75 sm:text-base">
              {product.details}
              {showMore && <> <span className="font-semibold">Tasting notes:</span> {product.tastingNotes}</>}{' '}
              <button
                type="button"
                aria-expanded={showMore}
                onClick={() => setShowMore(current => !current)}
                className="inline font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {showMore ? 'Less' : 'More'}
              </button>
            </p>

            <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-peach-mid/50 pb-4">
              <div className="flex items-baseline gap-2 justify-self-start">
                <p className="text-xl font-bold tracking-tight text-brown sm:text-2xl">{formatPrice(product.price)}</p>
                <p className="text-xs text-brown/60 sm:text-sm">per {product.weight}</p>
              </div>
              <div className="flex items-center justify-self-center overflow-hidden border border-black bg-white">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(current => Math.max(1, current - 1))}
                  className="h-11 w-11 bg-black text-xl font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brown disabled:cursor-not-allowed disabled:opacity-40"
                >
                  −
                </button>
                <input
                  id="product-quantity"
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  aria-label="Quantity"
                  onChange={event => setQuantity(Math.max(1, Math.min(99, Number(event.target.value) || 1)))}
                  className="h-11 w-14 text-center font-semibold text-brown outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={quantity >= 99}
                  onClick={() => setQuantity(current => Math.min(99, current + 1))}
                  className="h-11 w-11 bg-black text-xl font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brown disabled:cursor-not-allowed disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="min-h-12 bg-[#F58537] px-2 py-3 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#e8742b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F58537] sm:px-6 sm:text-sm"
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="min-h-12 border border-[#F58537] bg-white px-2 py-3 text-xs font-bold text-[#d96f26] transition-colors hover:bg-[#fff3e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F58537] sm:px-6 sm:text-sm"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
