import { useState } from 'react'

const partnerTypes = ['NGO / Donor', 'Restaurant / Hotel', 'Exporter / Importer', 'Corporate Gifting', 'Community Project', 'Other']

export default function PartnerWithUs() {
  const [form, setForm] = useState({ name: '', org: '', email: '', phone: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-peach py-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Partner With Us</h1>
        <p className="text-brown max-w-2xl mx-auto">
          Legacy Coffee welcomes collaborations with Donors, NGOs, restaurants, hotels, exporters, and institutions.
          Together we can make a greater impact.
        </p>
      </section>

      {/* Why Partner */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-primary text-2xl font-bold mb-8 text-center">Why Partner With Legacy Coffee?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🤝', title: 'Bulk Orders', text: 'Source premium Ugandan coffee directly at competitive prices for your business.' },
              { icon: '🎁', title: 'Corporate Gifting', text: 'Unique, meaningful coffee gift packages that tell a story of impact.' },
              { icon: '🌱', title: 'Community Projects', text: 'Co-invest in farmer training, women empowerment, and environmental restoration.' },
            ].map(item => (
              <div key={item.title} className="bg-peach-light rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-brown font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-brown/80 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-12 px-6 bg-peach-light text-center">
        <h2 className="text-primary text-2xl font-bold mb-8">Our Current Partners</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {['KCCA', 'ImagineHer', 'Tony Elumelu Foundation', 'YonderLife', 'CURAP', 'UNFCU Foundation'].map(p => (
            <div key={p} className="bg-white px-6 py-3 rounded-lg shadow text-brown font-semibold text-sm">{p}</div>
          ))}
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-primary text-3xl font-bold mb-2 text-center">Start a Partnership</h2>
          <p className="text-brown text-center mb-8 text-sm">Fill in the form and our team will reach out within 48 hours.</p>

          {submitted ? (
            <div className="bg-peach-light rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-primary font-bold text-xl mb-2">Thank You!</h3>
              <p className="text-brown text-sm">We've received your partnership request and will be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="border border-peach-mid rounded px-4 py-2 text-brown outline-none focus:border-primary text-sm" />
                <input required placeholder="Organisation Name" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })}
                  className="border border-peach-mid rounded px-4 py-2 text-brown outline-none focus:border-primary text-sm" />
                <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="border border-peach-mid rounded px-4 py-2 text-brown outline-none focus:border-primary text-sm" />
                <input placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="border border-peach-mid rounded px-4 py-2 text-brown outline-none focus:border-primary text-sm" />
              </div>
              <select required value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full border border-peach-mid rounded px-4 py-2 text-brown outline-none focus:border-primary text-sm">
                <option value="">Partnership Type</option>
                {partnerTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <textarea rows={4} required placeholder="Tell us about your partnership idea..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full border border-peach-mid rounded px-4 py-2 text-brown outline-none focus:border-primary text-sm resize-none" />
              <button type="submit" className="w-full bg-primary text-white py-3 rounded font-semibold hover:opacity-90 transition-opacity">
                Submit Partnership Request
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
