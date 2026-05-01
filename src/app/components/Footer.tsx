import { motion } from 'motion/react';
import { Link } from 'react-router';
import { MapPin, Clock, Truck, CreditCard, Instagram, Music2, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
      {/* CTA Strip */}
      <div
        className="py-12 px-4 text-center relative overflow-hidden"
        style={{ background: '#8e211e' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.3) 10px, rgba(0,0,0,0.3) 11px)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <p
            className="mb-2 tracking-[0.3em] uppercase text-sm"
            style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}
          >
            ¿Listo para encontrar tu fit perfecto?
          </p>
          <h2
            className="mb-6"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '0.05em',
              color: '#fff',
              lineHeight: 1,
            }}
          >
            Encuentra tu fit perfecto hoy
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/catalog">
              <motion.button
                className="px-8 py-3.5 text-sm tracking-widest uppercase"
                style={{
                  background: '#fff',
                  color: '#8e211e',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Ver Catálogo
              </motion.button>
            </Link>
            <a
              href="https://www.instagram.com/amattdenim/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="px-8 py-3.5 text-sm tracking-widest uppercase"
                style={{
                  background: 'transparent',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  border: '2px solid rgba(255,255,255,0.5)',
                }}
                whileHover={{ scale: 1.04, borderColor: '#fff' } as any}
                whileTap={{ scale: 0.97 }}
              >
                Síguenos en Instagram
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '2rem',
                  letterSpacing: '0.08em',
                  color: '#fff',
                }}
              >
                AMATT
              </span>
              <span
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '1.2rem',
                  letterSpacing: '0.4em',
                  color: '#8e211e',
                  marginLeft: '6px',
                }}
              >
                DENIM
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: '#666', fontFamily: 'Inter, sans-serif' }}
            >
              Jeans de calidad premium para dama y caballero. Moda denim con estilo
              urbano en el corazón de Cúcuta, Colombia.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <motion.a
                href="https://www.instagram.com/amattdenim/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  color: '#aaa',
                }}
                whileHover={{ scale: 1.1, borderColor: '#8e211e', color: '#fff' } as any}
              >
                <Instagram size={17} />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@amattdenim"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  color: '#aaa',
                }}
                whileHover={{ scale: 1.1, borderColor: '#8e211e', color: '#fff' } as any}
              >
                <Music2 size={17} />
              </motion.a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="mb-5 tracking-widest uppercase text-xs"
              style={{
                color: '#8e211e',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.2em',
              }}
            >
              Tienda
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Colección Dama', href: '/catalog?gender=women' },
                { label: 'Colección Caballero', href: '/catalog?gender=men' },
                { label: 'Novedades', href: '/catalog' },
                { label: 'Ofertas', href: '/catalog' },
                { label: 'Catálogo completo', href: '/catalog' },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm transition-colors"
                    style={{ color: '#666', fontFamily: 'Inter' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#666')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="mb-5 tracking-widest uppercase text-xs"
              style={{
                color: '#8e211e',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.2em',
              }}
            >
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} style={{ color: '#8e211e', marginTop: '2px', flexShrink: 0 }} />
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#666', fontFamily: 'Inter' }}
                >
                  Calle 6Bn #2e-236 Ceiba 2<br />
                  Cúcuta, Colombia
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Truck size={15} style={{ color: '#8e211e', marginTop: '2px', flexShrink: 0 }} />
                <p
                  className="text-sm"
                  style={{ color: '#666', fontFamily: 'Inter' }}
                >
                  Domicilios disponibles
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CreditCard size={15} style={{ color: '#8e211e', marginTop: '2px', flexShrink: 0 }} />
                <p
                  className="text-sm"
                  style={{ color: '#666', fontFamily: 'Inter' }}
                >
                  Pago contraentrega
                </p>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4
              className="mb-5 tracking-widest uppercase text-xs"
              style={{
                color: '#8e211e',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.2em',
              }}
            >
              Horarios
            </h4>
            <div className="space-y-4">
              <div
                className="p-4 rounded"
                style={{ background: '#111', border: '1px solid #1e1e1e' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={13} style={{ color: '#8e211e' }} />
                  <p
                    className="text-xs uppercase tracking-wider"
                    style={{
                      color: '#fff',
                      fontFamily: 'Inter',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                    }}
                  >
                    Lunes a Viernes
                  </p>
                </div>
                <p className="text-sm" style={{ color: '#aaa', fontFamily: 'Inter' }}>
                  9:30 am – 12:30 pm
                </p>
                <p className="text-sm" style={{ color: '#aaa', fontFamily: 'Inter' }}>
                  3:00 pm – 8:00 pm
                </p>
              </div>
              <div
                className="p-4 rounded"
                style={{ background: '#111', border: '1px solid #1e1e1e' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={13} style={{ color: '#8e211e' }} />
                  <p
                    className="text-xs uppercase tracking-wider"
                    style={{
                      color: '#fff',
                      fontFamily: 'Inter',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                    }}
                  >
                    Sábados
                  </p>
                </div>
                <p className="text-sm" style={{ color: '#aaa', fontFamily: 'Inter' }}>
                  9:30 am – 8:00 pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="px-4 py-5"
        style={{ borderTop: '1px solid #151515' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs"
            style={{ color: '#444', fontFamily: 'Inter' }}
          >
            © {new Date().getFullYear()} Amatt Denim. Todos los derechos reservados. — Cúcuta,
            Colombia
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#8e211e' }}
            />
            <p
              className="text-xs"
              style={{ color: '#444', fontFamily: 'Inter' }}
            >
              Domicilios · Pago contraentrega
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
