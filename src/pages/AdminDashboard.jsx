import { useState } from 'react'

const mockData = {
  stats: [
    { label: 'Newsletter Subscribers', value: 142, icon: '📬' },
    { label: 'Contact Messages', value: 38, icon: '✉️' },
    { label: 'Quote Requests', value: 21, icon: '📋' },
    { label: 'Partnership Requests', value: 9, icon: '🤝' },
  ],
  messages: [
    { id: 1, name: 'Alice Nakato', email: 'alice@example.com', subject: 'Bulk Order Inquiry', date: '2025-01-10', status: 'New' },
    { id: 2, name: 'Bob Tumwine', email: 'bob@example.com', subject: 'Partnership Proposal', date: '2025-01-09', status: 'Read' },
    { id: 3, name: 'Carol Apio', email: 'carol@example.com', subject: 'Export Quote', date: '2025-01-08', status: 'New' },
  ],
  subscribers: [
    { id: 1, name: 'David Ssali', email: 'david@example.com', date: '2025-01-10' },
    { id: 2, name: 'Eve Namukasa', email: 'eve@example.com', date: '2025-01-09' },
    { id: 3, name: 'Frank Opio', email: 'frank@example.com', date: '2025-01-07' },
  ],
}

const tabs = ['Overview', 'Messages', 'Subscribers', 'Products']

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [loggedIn, setLoggedIn] = useState(false)
  const [creds, setCreds] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleLogin = e => {
    e.preventDefault()
    if (creds.username === 'admin' && creds.password === 'admin123') {
      setLoggedIn(true)
    } else {
      setError('Invalid credentials. Try admin / admin123')
    }
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-peach-light flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 shadow-lg w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center text-white font-bold text-2xl mb-3">LC</div>
            <h2 className="text-primary text-2xl font-bold">Admin Login</h2>
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <input required placeholder="Username" value={creds.username} onChange={e => setCreds({ ...creds, username: e.target.value })}
              className="w-full border border-peach-mid rounded px-4 py-2 text-brown outline-none focus:border-primary text-sm" />
            <input required type="password" placeholder="Password" value={creds.password} onChange={e => setCreds({ ...creds, password: e.target.value })}
              className="w-full border border-peach-mid rounded px-4 py-2 text-brown outline-none focus:border-primary text-sm" />
            <button type="submit" className="w-full bg-primary text-white py-2 rounded font-semibold hover:opacity-90 transition-opacity">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-brown text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">LC</div>
          <span className="font-semibold">Legacy Coffee — Admin</span>
        </div>
        <button onClick={() => setLoggedIn(false)} className="text-white/70 hover:text-white text-sm">Logout</button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b px-6 flex gap-1">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-brown/60 hover:text-brown'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Overview */}
        {activeTab === 'Overview' && (
          <div>
            <h2 className="text-brown font-bold text-xl mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {mockData.stats.map(stat => (
                <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <p className="text-brown/70 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-brown font-semibold mb-4">Recent Messages</h3>
              <table className="w-full text-sm">
                <thead><tr className="text-brown/60 border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Subject</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Status</th>
                </tr></thead>
                <tbody>
                  {mockData.messages.map(m => (
                    <tr key={m.id} className="border-b last:border-0">
                      <td className="py-2 text-brown">{m.name}</td>
                      <td className="py-2 text-brown/80">{m.subject}</td>
                      <td className="py-2 text-brown/60">{m.date}</td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${m.status === 'New' ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Messages */}
        {activeTab === 'Messages' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-brown font-bold text-xl mb-6">Contact Messages</h2>
            <table className="w-full text-sm">
              <thead><tr className="text-brown/60 border-b">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Subject</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Status</th>
              </tr></thead>
              <tbody>
                {mockData.messages.map(m => (
                  <tr key={m.id} className="border-b last:border-0 hover:bg-peach-light/30">
                    <td className="py-3 text-brown font-medium">{m.name}</td>
                    <td className="py-3 text-brown/70">{m.email}</td>
                    <td className="py-3 text-brown/80">{m.subject}</td>
                    <td className="py-3 text-brown/60">{m.date}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${m.status === 'New' ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Subscribers */}
        {activeTab === 'Subscribers' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-brown font-bold text-xl mb-6">Newsletter Subscribers</h2>
            <table className="w-full text-sm">
              <thead><tr className="text-brown/60 border-b">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Subscribed On</th>
              </tr></thead>
              <tbody>
                {mockData.subscribers.map(s => (
                  <tr key={s.id} className="border-b last:border-0 hover:bg-peach-light/30">
                    <td className="py-3 text-brown font-medium">{s.name}</td>
                    <td className="py-3 text-brown/70">{s.email}</td>
                    <td className="py-3 text-brown/60">{s.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Products */}
        {activeTab === 'Products' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-brown font-bold text-xl mb-6">Products Management</h2>
            <p className="text-brown/60 text-sm">Product management will be connected to the backend. Coming soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
