import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LuMenu, LuShoppingCart, LuX } from 'react-icons/lu'
import { useCart } from '../context/useCart.js'
import { useAuth } from '../context/useAuth.js'

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
  const { isAuthenticated, user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authMessage, setAuthMessage] = useState('')
  const [showFloatingCart, setShowFloatingCart] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      setShowFloatingCart(!entry.isIntersecting)
    })
    observer.observe(header)

    return () => observer.disconnect()
  }, [])

  return (
    <>
    <header ref={headerRef} className="relative z-50 bg-white shadow-sm">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <NavLink to="/" className="text-xl font-bold text-primary" onClick={() => setIsMenuOpen(false)}>
          Legacy Coffee
        </NavLink>
        <div className="ml-auto hidden items-center gap-x-4 gap-y-2 md:flex">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `whitespace-nowrap text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-brown'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3 md:ml-0">
          {isAuthenticated ? (
            <>
              <span className="hidden max-w-28 truncate text-xs font-medium text-black lg:block">{user?.first_name || user?.email}</span>
              <button
                type="button"
                onClick={() => signOut().catch(() => setAuthMessage('Signed out locally; the server session could not be cleared.'))}
                className="hidden text-xs font-semibold text-black underline underline-offset-2 hover:text-primary md:inline"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link to="/signin" className="hidden text-xs font-semibold text-black underline underline-offset-2 hover:text-primary md:inline">
              Sign in
            </Link>
          )}
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
            <div className="mt-3 border-t border-peach-mid/50 pt-3">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false)
                    signOut().catch(() => setAuthMessage('Signed out locally; the server session could not be cleared.'))
                  }}
                  className="py-3 text-sm font-semibold text-black hover:text-primary"
                >
                  Sign out
                </button>
              ) : (
                <div className="flex flex-col gap-1">
                  <NavLink to="/signin" onClick={() => setIsMenuOpen(false)} className="py-3 text-sm font-semibold text-black hover:text-primary">Sign in</NavLink>
                  <NavLink to="/signup" onClick={() => setIsMenuOpen(false)} className="py-3 text-sm font-semibold text-black hover:text-primary">Create account</NavLink>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
    {authMessage && <p role="status" className="fixed bottom-4 left-4 z-[60] bg-black px-4 py-2 text-xs text-white">{authMessage}</p>}
    {showFloatingCart && (
      <NavLink
        to="/cart"
        aria-label={`Shopping cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
        className={({ isActive }) =>
          `fixed bottom-6 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-[50%] bg-[#F58537] text-white shadow-lg transition-colors hover:bg-[#e8742b] sm:bottom-8 sm:right-8 ${isActive ? 'ring-2 ring-black ring-offset-2' : ''}`
        }
      >
        <LuShoppingCart aria-hidden="true" className="h-6 w-6" />
        <span aria-hidden="true" className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold leading-none text-white">
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      </NavLink>
    )}
    </>
  )
}
