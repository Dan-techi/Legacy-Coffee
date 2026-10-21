import { useState } from 'react'

const pastIssues = [
  { title: 'Harvest Season 2024 Recap', date: 'December 2024', excerpt: 'A record-breaking harvest season with over 50,000kg of premium coffee collected from our farmer network.' },
  { title: 'Women in Coffee Initiative Launch', date: 'October 2024', excerpt: 'We launched our women empowerment program, enrolling 80 women farmers in our first cohort.' },
  { title: 'New Export Partnership Announced', date: 'August 2024', excerpt: 'Legacy Coffee signs a landmark export deal to bring Ugandan coffee to European markets.' },
]

export default function Newsletter() {
  const [form, setForm] = useState({ name: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      {/* Hero */}
      <section
        className="py-24 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #FCEBD0 0%, #F5C08A 100%)' }}
      >
        <div className="text-5xl mb-4">📬</div>
        <h1 className="text-4xl font-bold text-primary mb-4">Stay in the Loop</h1>
        <p className="text-brown max-w-xl mx-auto text-lg">
          Get the latest news on our farmers, coffee harvests, community impact, and partnership opportunities — delivered straight to your inbox.
        </p>
      </section>

      {/* Subscribe Form */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-lg mx-auto">
          {submitted ? (
            <div className="bg-peach-light rounded-2xl p-10 text-center shadow">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-primary text-2xl font-bold mb-2">You're Subscribed!</h2>
              <p className="text-brown text-sm">Welcome to the Legacy Coffee community. Watch your inbox for our next newsletter.</p>
            </div>
          ) : (
            <div className="bg-peach-light rounded-2xl p-10 shadow">
              <h2 className="text-primary text-2xl font-bold mb-2 text-center">Subscribe to Our Newsletter</h2>
              <p className="text-brown text-sm text-center mb-6">Join hundreds of coffee lovers and impact supporters.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  placeholder="Your Full Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-peach-mid rounded px-4 py-3 text-brown outline-none focus:border-primary text-sm"
                />
                <input
                  required
                  type="email"
                  placeholder="Your Email Address"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-peach-mid rounded px-4 py-3 text-brown outline-none focus:border-primary text-sm"
                />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded font-semibold hover:opacity-90 transition-opacity">
                  Subscribe Now
                </button>
              </form>
              <p className="text-brown/60 text-xs text-center mt-4">No spam. Unsubscribe anytime.</p>
            </div>
          )}
        </div>
      </section>

      {/* Past Issues */}
      <section className="py-16 px-6 bg-peach-light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-primary text-2xl font-bold mb-8 text-center">Past Issues</h2>
          <div className="space-y-4">
            {pastIssues.map(issue => (
              <div key={issue.title} className="bg-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-brown font-bold text-lg mb-1">{issue.title}</h3>
                  <p className="text-brown/70 text-sm mb-2">{issue.excerpt}</p>
                  <span className="text-primary text-xs font-medium">{issue.date}</span>
                </div>
                <button className="bg-peach text-brown px-5 py-2 rounded font-medium text-sm hover:bg-primary hover:text-white transition-colors flex-shrink-0">
                  Read Issue
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
