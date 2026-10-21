import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LuMenu, LuShoppingCart, LuX } from 'react-icons/lu'
import { useCart } from '../context/useCart.js'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/shop', label: 'Shop' },
  { to: '/partner', label: 'Partner With Us' },
  { to: '/contact', label: 'Contact' },
  { to: '/newsletter', label: 'Newsletter' },
]

export default function Navbar() {
  const { cartCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative z-50 bg-white shadow-sm">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <NavLink to="/" className="text-xl font-bold text-primary" onClick={() => setIsMenuOpen(false)}>
          Legacy Coffee
        </NavLink>
        <div className="flex items-center gap-4">
          <NavLink
            to="/cart"
            aria-label={`Shopping cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            className={({ isActive }) =>
              `relative inline-flex items-center justify-center p-1 transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-brown'}`
            }
          >
            <LuShoppingCart aria-hidden="true" className="h-6 w-6" />
            <span aria-hidden="true" className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F58537] px-1 text-[10px] font-bold leading-none text-white">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          </NavLink>
          <button
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation-links"
            onClick={() => setIsMenuOpen(open => !open)}
            className="inline-flex items-center justify-center p-1 text-brown transition-colors hover:text-primary md:hidden"
          >
            {isMenuOpen
              ? <LuX aria-hidden="true" className="h-6 w-6" />
              : <LuMenu aria-hidden="true" className="h-6 w-6" />}
          </button>
        </div>
        <div className="hidden items-center gap-x-5 gap-y-2 md:flex">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-brown'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
      {isMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/30 md:hidden"
          />
          <div
            id="site-navigation-links"
            className="mobile-nav-slide-in fixed bottom-0 right-0 top-16 z-50 flex w-1/2 flex-col gap-1 overflow-y-auto border-l border-peach-mid/40 bg-white p-5 md:hidden"
          >
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-brown'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </>
      )}
    </header>
  )
}
