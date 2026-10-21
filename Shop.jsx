import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, formatPrice } from './data/products.js'
import { useCart } from './context/useCart.js'
import ProductImage from './components/ProductImage.jsx'

export default function Shop() {
  const { addToCart } = useCart()
  const [form, setForm] = useState({ name: '', email: '', product: '', quantity: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [addedProduct, setAddedProduct] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleAddToCart = product => {
    addToCart(product)
    setAddedProduct(product.id)
    window.setTimeout(() => setAddedProduct(''), 1800)
  }

  return (
    <div className="bg-[#fffdfa]">
      <section className="bg-gradient-to-br from-peach-light via-white to-peach px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">Legacy Coffee · Western Uganda</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-brown sm:text-5xl lg:text-6xl">
            Coffee with a story worth sharing.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brown/75 sm:text-lg">
            Discover carefully sourced Ugandan coffee, grown by smallholder farmers and roasted to bring every cup to life.
          </p>
        </div>
      </section>

      <section className="bg-[#fffdfa] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">Small batch, big character</p>
              <h2 className="text-2xl font-bold text-brown sm:text-3xl">Find your perfect cup</h2>
            </div>
            <p className="hidden pb-1 text-sm text-brown/60 sm:block">Four favorites, freshly sourced</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {products.map(p => (
              <article key={p.id} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-peach-mid/40 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <Link to={`/products/${p.id}`} aria-label={`View ${p.name}`} className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary">
                  <div className="relative block aspect-[4/3] w-full overflow-hidden bg-peach-light">
                    <ProductImage product={p} className="transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-brown shadow-sm sm:left-3 sm:top-3 sm:text-xs">
                      {p.weight}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-4 lg:p-5">
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-primary sm:text-xs">{p.roast}</p>
                    <p className="mb-2 text-sm font-bold leading-snug text-brown group-hover:text-primary sm:text-base lg:text-lg">{p.name}</p>
                    <p className="mb-4 flex-1 text-xs leading-relaxed text-brown/70 sm:text-sm">{p.description}</p>
                    <p className="mt-auto text-lg font-bold text-brown sm:text-xl">{formatPrice(p.price)}</p>
                  </div>
                </Link>
                <div className="px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(p)}
                    className="w-full rounded-lg bg-primary px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm"
                  >
                    {addedProduct === p.id ? 'Added!' : 'Add to cart'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="bg-peach-light px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.18em] text-primary">For your business</p>
          <h2 className="mb-2 text-center text-3xl font-bold text-brown">Need a larger order?</h2>
          <p className="mb-8 text-center text-sm leading-relaxed text-brown/75">Request a tailored quote for bulk coffee, corporate gifting, or export inquiries.</p>

          {submitted ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-primary font-bold text-xl mb-2">Quote Request Sent!</h3>
              <p className="text-brown text-sm">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-peach-mid/40 bg-white p-5 shadow-sm sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="border border-peach-mid rounded px-4 py-2 text-brown outline-none focus:border-primary text-sm" />
                <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="border border-peach-mid rounded px-4 py-2 text-brown outline-none focus:border-primary text-sm" />
              </div>
              <select required value={form.product} onChange={e => setForm({ ...form, product: e.target.value })}
                className="w-full border border-peach-mid rounded px-4 py-2 text-brown outline-none focus:border-primary text-sm">
                <option value="">Select Product</option>
                {products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
              <input required placeholder="Quantity (e.g. 50kg)" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })}
                className="w-full border border-peach-mid rounded px-4 py-2 text-brown outline-none focus:border-primary text-sm" />
              <textarea rows={4} placeholder="Additional message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full border border-peach-mid rounded px-4 py-2 text-brown outline-none focus:border-primary text-sm resize-none" />
              <button type="submit" className="w-full bg-primary text-white py-3 rounded font-semibold hover:opacity-90 transition-opacity">
                Submit Quote Request
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
