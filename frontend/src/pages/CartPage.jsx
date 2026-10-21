import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products.js'
import { useCart } from '../context/useCart.js'
import ProductImage from '../components/ProductImage.jsx'

export default function CartPage() {
  const { items, cartTotal, updateQuantity, removeFromCart } = useCart()

  if (items.length === 0) {
    return (
      <section className="px-6 py-20 text-center">
        <div className="mx-auto mb-6 h-48 max-w-sm overflow-hidden rounded-xl bg-peach-light">
          <ProductImage product={{ image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&auto=format&fit=crop&q=85', imageAlt: 'Coffee beans ready to be brewed' }} />
        </div>
        <h1 className="mb-3 text-3xl font-bold text-primary">Your cart is empty</h1>
        <p className="mb-6 text-brown">Find your next favorite cup in our coffee shop.</p>
        <Link to="/shop" className="rounded bg-primary px-6 py-3 font-semibold text-white">Browse coffee</Link>
      </section>
    )
  }

  return (
    <section className="bg-white px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold text-primary">Your Cart</h1>
        <div className="space-y-4">
          {items.map(item => (
            <article key={item.id} className="flex flex-col gap-4 rounded-xl bg-peach-light p-5 sm:flex-row sm:items-center">
              <Link to={`/products/${item.id}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-peach" aria-label={`View ${item.name}`}>
                <ProductImage product={item} />
              </Link>
              <div className="flex-1">
                <Link to={`/products/${item.id}`} className="font-bold text-brown hover:text-primary">{item.name}</Link>
                <p className="text-sm text-brown/70">{item.weight} · {formatPrice(item.price)} each</p>
              </div>
              <label className="flex items-center gap-2 text-sm text-brown">
                Quantity
                <input
                  aria-label={`Quantity of ${item.name}`}
                  type="number"
                  min="1"
                  max="99"
                  value={item.quantity}
                  onChange={event => updateQuantity(item.id, Math.max(1, Math.min(99, Number(event.target.value) || 1)))}
                  className="w-20 rounded border border-peach-mid bg-white px-3 py-2"
                />
              </label>
              <p className="min-w-24 text-right font-bold text-brown">{formatPrice(item.price * item.quantity)}</p>
              <button type="button" onClick={() => removeFromCart(item.id)} className="text-sm font-medium text-primary underline hover:text-brown">
                Remove
              </button>
            </article>
          ))}
        </div>
        <div className="ml-auto mt-8 max-w-sm rounded-xl bg-peach-light p-6">
          <div className="mb-2 flex justify-between text-brown"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
          <p className="mb-5 text-xs text-brown/70">Delivery costs, if applicable, will be confirmed by our team.</p>
          <Link to="/checkout" className="block rounded bg-primary px-6 py-3 text-center font-semibold text-white transition-opacity hover:opacity-90">
            Continue to checkout
          </Link>
          <Link to="/shop" className="mt-4 block text-center text-sm font-medium text-brown hover:text-primary">Continue shopping</Link>
        </div>
      </div>
    </section>
  )
}
