import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiChevronDown, FiX } from 'react-icons/fi'
import { LuShoppingCart } from 'react-icons/lu'
import { useCart } from '../context/useCart.js'

const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us', to: '/about',
    children: [
      { label: 'Our Story', to: '/about' },
      { label: 'Our Team', to: '/about#team' },
    ]
  },
  {
    label: 'Shop', to: '/shop',
    children: [
      { label: 'All Products', to: '/shop' },
      { label: 'Get a Quote', to: '/shop#quote' },
    ]
  },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Partner With Us', to: '/partner' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Navbar() {
  const { cartCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdown, setDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur shadow-md' : 'bg-peach'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex-shrink-0" onClick={() => setMenuOpen(false)}>
            <img src="https://res.cloudinary.com/adfm8lvp/image/upload/v1792498215/Legacy_logo.png" alt="Legacy Coffee" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.label} className="relative">
                {link.children ? (
                  <div onMouseEnter={() => setDropdown(link.label)} onMouseLeave={() => setDropdown(null)}>
                    <button className="flex items-center gap-1 px-4 py-2 rounded-full text-brown hover:bg-peach-light hover:text-primary font-medium transition-all text-sm">
                      {link.label} <FiChevronDown size={13} className={`transition-transform ${dropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    {dropdown === link.label && (
                      <ul className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-2xl py-2 min-w-44 z-50 border border-peach-light">
                        {link.children.map(child => (
                          <li key={child.label}>
                            <Link to={child.to} className="flex items-center px-4 py-2.5 text-brown hover:bg-peach-light hover:text-primary transition-colors text-sm">
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <NavLink to={link.to}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-full font-medium text-sm transition-all ${isActive ? 'bg-primary text-white shadow-sm' : 'text-brown hover:bg-peach-light hover:text-primary'}`
                    }>
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              aria-label={`Shopping cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-brown transition-colors hover:bg-peach-light hover:text-primary"
            >
              <LuShoppingCart aria-hidden="true" size={20} />
              <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            </Link>
            <Link to="/shop#quote" className="hidden md:block bg-primary text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-brown transition-colors shadow-sm">
              Get a Quote
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-full hover:bg-peach-light transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-brown transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-brown transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-brown transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* backdrop */}
        <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />

        {/* drawer */}
        <div className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-peach-light">
            <img src="https://res.cloudinary.com/adfm8lvp/image/upload/v1792498215/Legacy_logo.png" alt="Legacy Coffee" className="h-9 w-auto" />
            <button onClick={() => setMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full bg-peach-light text-brown hover:bg-primary hover:text-white transition-colors">
              <FiX size={18} />
            </button>
          </div>

          {/* links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            {navLinks.map(link => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => setOpenMobileDropdown(openMobileDropdown === link.label ? null : link.label)}
                      className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-brown font-semibold text-base hover:bg-peach-light transition-colors"
                    >
                      {link.label}
                      <FiChevronDown size={16} className={`transition-transform ${openMobileDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    {openMobileDropdown === link.label && (
                      <div className="ml-4 mb-1 border-l-2 border-primary/30 pl-3">
                        {link.children.map(child => (
                          <Link key={child.label} to={child.to}
                            className="block py-2.5 px-3 text-sm text-brown/70 hover:text-primary transition-colors"
                            onClick={() => setMenuOpen(false)}>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink to={link.to}
                    className={({ isActive }) =>
                      `block px-4 py-3.5 rounded-xl font-semibold text-base transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-brown hover:bg-peach-light'}`
                    }
                    onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="px-6 py-5 border-t border-peach-light">
            <Link to="/shop#quote"
              className="block text-center bg-primary text-white px-6 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-brown transition-colors"
              onClick={() => setMenuOpen(false)}>
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
