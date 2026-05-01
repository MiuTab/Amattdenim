import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Search, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navLinks = [
  { label: 'Inicio', href: '/' },
  {
    label: 'Tienda',
    href: '/catalog',
    children: [
      { label: 'Todo', href: '/catalog' },
      { label: 'Dama', href: '/catalog?gender=women' },
      { label: 'Caballero', href: '/catalog?gender=men' },
    ],
  },
  { label: 'Colección Dama', href: '/catalog?gender=women' },
  { label: 'Colección Caballero', href: '/catalog?gender=men' },
];

export function Navbar() {
  const { totalItems, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(10,10,10,0.95)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(142,33,30,0.2)' : 'none',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative overflow-hidden">
                <img
                  src="https://i.imgur.com/JvLGDXa.jpeg"
                  alt="Amatt Denim"
                  className="h-10 w-auto object-contain"
                  onError={e => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const next = target.nextElementSibling as HTMLElement;
                    if (next) next.style.display = 'flex';
                  }}
                />
                <div
                  className="hidden items-center gap-1"
                  style={{ display: 'none' }}
                >
                  <span
                    style={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: '1.8rem',
                      letterSpacing: '0.08em',
                      color: '#ffffff',
                    }}
                  >
                    AMATT
                  </span>
                  <span
                    style={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: '1.1rem',
                      letterSpacing: '0.3em',
                      color: '#8e211e',
                    }}
                  >
                    DENIM
                  </span>
                </div>
              </div>
              {/* Fallback text logo always visible on mobile or if img fails */}
              <div className="flex items-baseline gap-1">
                <span
                  className="hidden xs:hidden"
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '1.6rem',
                    letterSpacing: '0.05em',
                    color: '#fff',
                  }}
                >
                  AMATT
                </span>
                <span
                  className="hidden xs:hidden"
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '0.9rem',
                    letterSpacing: '0.3em',
                    color: '#8e211e',
                  }}
                >
                  DENIM
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className="flex items-center gap-1 text-sm tracking-wider uppercase transition-colors"
                      style={{
                        color: '#ccc',
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {link.label}
                      <ChevronDown size={12} />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-40 rounded overflow-hidden shadow-xl"
                          style={{
                            background: 'rgba(15,15,15,0.98)',
                            border: '1px solid rgba(142,33,30,0.3)',
                          }}
                        >
                          {link.children.map(child => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="block px-4 py-3 text-sm transition-all hover:pl-6"
                              style={{
                                color: '#ccc',
                                fontFamily: 'Inter, sans-serif',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                              }}
                              onMouseEnter={e =>
                                (e.currentTarget.style.color = '#8e211e')
                              }
                              onMouseLeave={e =>
                                (e.currentTarget.style.color = '#ccc')
                              }
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="relative text-sm tracking-wider uppercase transition-colors group"
                    style={{
                      color:
                        location.pathname === link.href ? '#8e211e' : '#ccc',
                      fontFamily: 'Inter, sans-serif',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-1 left-0 h-px transition-all duration-300 group-hover:w-full"
                      style={{
                        background: '#8e211e',
                        width:
                          location.pathname === link.href ? '100%' : '0%',
                      }}
                    />
                  </Link>
                )
              )}
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              <button
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-full transition-colors"
                style={{ color: '#aaa' }}
                onMouseEnter={e =>
                  (e.currentTarget.style.color = '#8e211e')
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.color = '#aaa')
                }
              >
                <Search size={18} />
              </button>

              {/* Cart button */}
              <motion.button
                onClick={toggleCart}
                className="relative flex items-center justify-center w-10 h-10 rounded-full transition-colors"
                style={{ color: '#fff' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag size={22} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white"
                      style={{
                        background: '#8e211e',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.65rem',
                      }}
                    >
                      {totalItems > 9 ? '9+' : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile menu button */}
              <button
                className="md:hidden flex items-center justify-center w-9 h-9"
                style={{ color: '#fff' }}
                onClick={() => setMobileOpen(prev => !prev)}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: '#0a0a0a' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
              <div className="mb-4">
                <span
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '2.5rem',
                    letterSpacing: '0.1em',
                    color: '#fff',
                  }}
                >
                  AMATT
                </span>
                <span
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '1.5rem',
                    letterSpacing: '0.4em',
                    color: '#8e211e',
                    marginLeft: '8px',
                  }}
                >
                  DENIM
                </span>
              </div>
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Toda la Tienda', href: '/catalog' },
                { label: 'Colección Dama', href: '/catalog?gender=women' },
                { label: 'Colección Caballero', href: '/catalog?gender=men' },
              ].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={link.href}
                    className="text-3xl"
                    style={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      letterSpacing: '0.1em',
                      color: location.pathname === link.href ? '#8e211e' : '#fff',
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div
                className="mt-4 pt-4"
                style={{ borderTop: '1px solid #222' }}
              >
                <p
                  className="text-center text-sm tracking-widest"
                  style={{ color: '#555', fontFamily: 'Inter, sans-serif' }}
                >
                  CÚCUTA, COLOMBIA
                </p>
              </div>
            </div>
            <button
              className="absolute top-5 right-5 p-2"
              style={{ color: '#fff' }}
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
