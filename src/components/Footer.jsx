import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaXTwitter } from 'react-icons/fa6'
import { useState } from 'react'

const menuLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Shop', to: '/shop' },
  { label: 'Partner With Us', to: '/partner' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Newsletter', to: '/newsletter' },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer>
      {/* Wave divider */}
      <div className="bg-white">
        <svg viewBox="0 0 1440 80" className="w-full block" preserveAspectRatio="none">
          <path fill="#F0935A" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <div className="bg-footer text-white pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="flex flex-col items-start gap-2">
            <img src="https://res.cloudinary.com/adfm8lvp/image/upload/v1792498215/Legacy_logo.png" alt="Legacy Coffee" className="h-16 w-auto" />
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-3">Menu</h4>
            <ul className="space-y-1">
              {menuLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-white/80 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-3">Contact</h4>
            <p className="text-white/80 text-sm mb-1">Address: Butiiti, Kyenjojo District, Uganda</p>
            <a href="mailto:info@legacycoffee.org" className="text-white text-sm hover:underline block mb-1">
              info@legacycoffee.org
            </a>
            <p className="text-white/80 text-sm mb-4">+256 752 254 962</p>

            {/* Social Icons */}
            <div className="flex gap-3 text-white text-xl mb-4">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
              <a href="#" aria-label="X"><FaXTwitter /></a>
            </div>

            {/* Newsletter subscribe */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="sample@mail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded text-brown text-sm outline-none"
              />
              <button className="bg-slate text-white px-4 py-2 rounded text-sm hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>

          {/* Location Map */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-3">Location</h4>
            <iframe
              title="Legacy Coffee Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.4!2d30.6!3d0.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMCzKsDM2JzAwLjAiTiAzMMKwMzYnMDAuMCJF!5e0!3m2!1sen!2sug!4v1"
              width="100%"
              height="150"
              className="rounded border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        <div className="text-center text-white/60 text-xs mt-6">
          © {new Date().getFullYear()} Legacy Coffee Uganda. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
