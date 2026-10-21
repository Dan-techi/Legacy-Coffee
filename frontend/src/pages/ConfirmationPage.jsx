import { useEffect } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { formatPrice } from '../data/products.js'
import { useCart } from '../context/useCart.js'
import ProductImage from '../components/ProductImage.jsx'

export default function ConfirmationPage() {
  const location = useLocation()
  const { latestOrder, clearCart } = useCart()
  const order = location.state?.order || latestOrder

  useEffect(() => {
    if (order) clearCart()
  }, [order, clearCart])

  if (!order) {
    return <Navigate to="/shop" replace />
  }

  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl bg-peach-light p-8 text-center sm:p-12">
        <div className="mx-auto mb-6 h-40 max-w-xs overflow-hidden rounded-xl bg-white">
          <ProductImage product={order.items[0]} />
        </div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">Order received</p>
        <h1 className="mb-3 text-3xl font-bold text-brown">Thank you, {order.customer.name}!</h1>
        <p className="mb-6 text-brown/80">Your order request is in. We’ll contact you at {order.customer.email} to confirm delivery and payment details.</p>
        <div className="mb-6 rounded-xl bg-white p-5 text-left">
          <div className="mb-4 flex justify-between gap-4 text-sm text-brown">
            <span>Order reference</span><strong>{order.id}</strong>
          </div>
          <ul className="space-y-3 border-y border-peach-mid py-4 text-sm text-brown">
            {order.items.map(item => (
              <li key={item.id} className="flex justify-between gap-4">
                <span>{item.name} × {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between pt-4 font-bold text-brown">
            <span>Total</span><span>{formatPrice(order.total)}</span>
          </div>
        </div>
        <p className="mb-7 text-xs text-brown/70">No online payment was collected for this order request.</p>
        <Link to="/shop" className="inline-block rounded bg-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90">
          Continue shopping
        </Link>
      </div>
    </section>
  )
}
