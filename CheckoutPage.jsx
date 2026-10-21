import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { formatPrice } from './data/products.js'
import { useCart } from './context/useCart.js'

const inputClass = 'w-full rounded border border-peach-mid px-4 py-3 text-sm text-brown outline-none focus:border-primary'

export default function CheckoutPage() {
  const { items, cartTotal, placeOrder } = useCart()
  const navigate = useNavigate()
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '', city: '', notes: '' })

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  const handleChange = event => setCustomer({ ...customer, [event.target.name]: event.target.value })
  const handleSubmit = event => {
    event.preventDefault()
    const order = placeOrder(customer)
    navigate('/confirm', { state: { order } })
  }

  return (
    <section className="bg-white px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-primary">Checkout</h1>
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-xl font-bold text-brown">Delivery details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required autoComplete="name" name="name" value={customer.name} onChange={handleChange} placeholder="Full name" className={inputClass} />
              <input required type="email" autoComplete="email" name="email" value={customer.email} onChange={handleChange} placeholder="Email address" className={inputClass} />
              <input required type="tel" autoComplete="tel" name="phone" value={customer.phone} onChange={handleChange} placeholder="Phone number" className={inputClass} />
              <input required autoComplete="street-address" name="address" value={customer.address} onChange={handleChange} placeholder="Street address" className={inputClass} />
              <input required autoComplete="address-level2" name="city" value={customer.city} onChange={handleChange} placeholder="Town or city" className={inputClass} />
              <textarea name="notes" value={customer.notes} onChange={handleChange} rows={3} placeholder="Delivery notes (optional)" className={`${inputClass} resize-y`} />
            </div>
            <p className="rounded-lg bg-peach-light p-4 text-sm leading-relaxed text-brown">
              This checkout places an order request only. Our team will contact you to confirm delivery and payment details; no payment is collected online.
            </p>
            <button type="submit" className="w-full rounded bg-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto">
              Place order
            </button>
          </form>

          <aside className="h-fit rounded-xl bg-peach-light p-6">
            <h2 className="mb-5 text-xl font-bold text-brown">Order summary</h2>
            <ul className="mb-5 space-y-4">
              {items.map(item => (
                <li key={item.id} className="flex justify-between gap-4 text-sm text-brown">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-peach-mid pt-4 font-bold text-brown">
              <span>Total</span><span>{formatPrice(cartTotal)}</span>
            </div>
            <Link to="/cart" className="mt-5 block text-sm font-medium text-brown underline hover:text-primary">Edit cart</Link>
          </aside>
        </div>
      </div>
    </section>
  )
}
