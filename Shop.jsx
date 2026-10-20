import { useState } from 'react'

const products = [
  { id: 1, name: 'Single Origin Arabica', weight: '1kg', price: '$18', description: 'Light roast with fruity notes from Kyenjojo highlands.' },
  { id: 2, name: 'Robusta Blend', weight: '500g', price: '$10', description: 'Bold and earthy, perfect for espresso lovers.' },
  { id: 3, name: 'Premium Export Grade', weight: '5kg', price: '$80', description: 'Bulk export-quality green beans, direct from farmers.' },
  { id: 4, name: 'Roasted Ground Coffee', weight: '250g', price: '$7', description: 'Ready-to-brew medium roast, smooth and balanced.' },
]

export default function Shop() {
  const [form, setForm] = useState({ name: '', email: '', product: '', quantity: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-peach py-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Our Coffee Shop</h1>
        <p className="text-brown max-w-xl mx-auto">
          Freshly sourced from smallholder farmers in Western Uganda. Order or request a bulk quote below.
        </p>
      </section>

      {/* Products */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-primary text-2xl font-bold mb-8 text-center">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-peach-light rounded-xl p-6 flex flex-col">
                <div className="w-full h-40 bg-peach rounded-lg mb-4 flex items-center justify-center text-5xl">☕</div>
                <h3 className="text-brown font-bold text-lg mb-1">{p.name}</h3>
                <p className="text-brown/70 text-sm mb-2">{p.weight}</p>
                <p className="text-brown/80 text-sm flex-1 mb-4">{p.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-xl">{p.price}</span>
                  <button className="bg-primary text-white px-4 py-1.5 rounded text-sm hover:opacity-90 transition-opacity">
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get a Quote */}
      <section id="quote" className="py-16 px-6 bg-peach-light">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-primary text-3xl font-bold mb-2 text-center">Get a Quote</h2>
          <p className="text-brown text-center mb-8 text-sm">For bulk orders, corporate gifting, or export inquiries.</p>

          {submitted ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-primary font-bold text-xl mb-2">Quote Request Sent!</h3>
              <p className="text-brown text-sm">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 space-y-4 shadow-sm">
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
