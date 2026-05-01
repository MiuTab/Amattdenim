import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import {
  ChevronDown,
  Star,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Scissors,
  Truck,
  CreditCard,
  MapPin,
  Tag,
} from 'lucide-react';
import { getFeaturedProducts } from '../data/products';
import { ProductCard } from '../components/ProductCard';

const heroImages = [
  'https://images.unsplash.com/photo-1601975586886-da4d805c336f?w=1600&q=90',
  'https://images.unsplash.com/photo-1764937572078-5e2f75649219?w=1600&q=90',
  'https://images.unsplash.com/photo-1750857740128-af60030f5057?w=1600&q=90',
];

const testimonials = [
  {
    id: 1,
    name: 'Valentina Ríos',
    city: 'Cúcuta',
    rating: 5,
    text: 'Los mejores jeans que he comprado. La calidad es increíble y el ajuste es perfecto. Definitivamente mi tienda favorita para denim.',
    product: 'Skinny Classic Noir',
    avatar: 'VR',
  },
  {
    id: 2,
    name: 'Andrés Moncada',
    city: 'Cúcuta',
    rating: 5,
    text: 'Pedí por domicilio y llegaron el mismo día. El pago contraentrega me da mucha confianza. El Jean Slim Premium es exactamente lo que buscaba.',
    product: 'Slim Premium Dark',
    avatar: 'AM',
  },
  {
    id: 3,
    name: 'Daniela Castro',
    city: 'Villa del Rosario',
    rating: 5,
    text: 'El Wide Leg Luxe es una obra de arte. El denim es de primera calidad y la caída es perfecta. Amatt Denim nunca decepciona.',
    product: 'Wide Leg Luxe',
    avatar: 'DC',
  },
  {
    id: 4,
    name: 'Felipe Ortiz',
    city: 'Los Patios',
    rating: 4,
    text: 'Muy buena atención y calidad en los productos. El envío fue rápido y el jean llegó tal como se ve en las fotos. Recomendado al 100%.',
    product: 'Regular Classic',
    avatar: 'FO',
  },
];

const differentiators = [
  {
    icon: Scissors,
    title: 'Denim Premium',
    desc: 'Seleccionamos los mejores telares. Cada jean pasa por un riguroso control de calidad.',
    stat: '100%',
    statLabel: 'Calidad Premium',
  },
  {
    icon: Zap,
    title: 'Ajuste Perfecto',
    desc: 'Cortes diseñados para toda silueta. Tecnología denim que se adapta a tu cuerpo.',
    stat: '+500',
    statLabel: 'Clientes felices',
  },
  {
    icon: Shield,
    title: 'Garantía Total',
    desc: 'Respaldamos cada prenda. Si no quedas satisfecho, te cambiamos el producto.',
    stat: '100%',
    statLabel: 'Garantía',
  },
  {
    icon: Truck,
    title: 'Domicilio Express',
    desc: 'Hacemos domicilios en Cúcuta y zona metropolitana. Pago cómodo contraentrega.',
    stat: '1 día',
    statLabel: 'Entrega',
  },
];

const trustBadges = [
  { Icon: Truck, text: 'Domicilios' },
  { Icon: CreditCard, text: 'Pago contraentrega' },
  { Icon: Star, text: '+500 clientes' },
] as const;

const deliveryItems = [
  { Icon: Truck, title: 'Hacemos Domicilios', desc: 'Te llevamos tu jean a la puerta de tu casa en Cúcuta' },
  { Icon: CreditCard, title: 'Pago Contraentrega', desc: 'Recibe primero, paga después. Cero riesgos.' },
  { Icon: MapPin, title: 'Cúcuta, Colombia', desc: 'Calle 6Bn #2e-236 Ceiba 2' },
] as const;

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [heroIndex, setHeroIndex] = useState(0);

  const featured = getFeaturedProducts();

  return (
    <div style={{ background: '#0d0d0d', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <div ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Background image with parallax */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={heroIndex}
              src={heroImages[heroIndex]}
              alt="Amatt Denim Hero"
              className="w-full h-full object-cover"
              style={{ height: '120%', objectPosition: 'center top' }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>

          {/* Gradient overlays */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(13,13,13,1) 0%, transparent 40%)',
            }}
          />
        </motion.div>

        {/* Hero image switcher dots */}
        <div className="absolute bottom-24 right-8 flex flex-col gap-2 z-10">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className="w-1.5 rounded-full transition-all duration-300"
              style={{
                height: heroIndex === i ? '24px' : '8px',
                background: heroIndex === i ? '#8e211e' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-4xl"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span
              className="inline-block px-4 py-1.5 mb-6 text-xs uppercase"
              style={{
                color: '#fff',
                background: 'rgba(142,33,30,0.8)',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.25em',
              }}
            >
              Nueva Colección 2025
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
              letterSpacing: '0.02em',
              lineHeight: 0.9,
              color: '#fff',
            }}
          >
            DENIM QUE
            <br />
            <span style={{ color: '#8e211e' }}>DEFINE</span>
            <br />
            TU ESTILO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 mb-8 max-w-md text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Jeans premium para dama y caballero. Calidad superior, ajuste perfecto,
            estilo urbano. Domicilios y pago contraentrega en Cúcuta.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/catalog">
              <motion.button
                className="px-8 py-4 text-sm uppercase tracking-wider font-semibold"
                style={{
                  background: '#8e211e',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.15em',
                }}
                whileHover={{ scale: 1.04, background: '#a02520' } as any}
                whileTap={{ scale: 0.97 }}
              >
                Comprar Ahora
              </motion.button>
            </Link>
            <Link to="/catalog">
              <motion.button
                className="px-8 py-4 text-sm uppercase tracking-wider font-semibold"
                style={{
                  background: 'transparent',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.15em',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                }}
                whileHover={{
                  borderColor: '#fff',
                  background: 'rgba(255,255,255,0.08)',
                } as any}
                whileTap={{ scale: 0.97 }}
              >
                Explorar Colección
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust badges — SVG icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-6 mt-10"
          >
            {trustBadges.map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={15} style={{ color: '#8e211e' }} />
                <span
                  className="text-xs"
                  style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}
                >
                  {text}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem' }}
          >
            Scroll
          </span>
          <ChevronDown size={18} style={{ color: 'rgba(255,255,255,0.4)' }} />
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          ANNOUNCEMENT BAR
      ═══════════════════════════════════════════════════════ */}
      <div className="py-3 overflow-hidden" style={{ background: '#8e211e' }}>
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-6 text-xs text-white uppercase"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.2em' }}
            >
              <span className="flex items-center gap-1.5">
                <Truck size={11} />Domicilios en Cúcuta
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
              <span className="flex items-center gap-1.5">
                <CreditCard size={11} />Pago Contraentrega
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
              <span className="flex items-center gap-1.5">
                <Star size={11} />Calidad Premium
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
              <span className="flex items-center gap-1.5">
                <Tag size={11} />Nueva Colección 2025
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CATEGORIES
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12"
        >
          <p
            className="text-xs uppercase mb-3"
            style={{ color: '#8e211e', fontFamily: 'Inter', letterSpacing: '0.3em' }}
          >
            Nuestras Colecciones
          </p>
          <h2
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '0.05em',
              color: '#fff',
              lineHeight: 1,
            }}
          >
            Estilo para cada uno
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Women Category */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/catalog?gender=women" className="group block relative overflow-hidden rounded-xl">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <motion.img
                  src="https://images.unsplash.com/photo-1762164130276-021d7c91cd89?w=800&q=85"
                  alt="Colección Dama"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6 }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                  }}
                />
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'rgba(142,33,30,0.15)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p
                    className="text-xs uppercase mb-2"
                    style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.25em' }}
                  >
                    Colección
                  </p>
                  <h3
                    style={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                      letterSpacing: '0.08em',
                      color: '#fff',
                      lineHeight: 1,
                    }}
                  >
                    DAMA
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Skinny · Wide Leg · Boyfriend · Mom · Flare
                  </p>
                  <motion.div
                    className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
                    style={{ color: '#fff' }}
                    initial={{ x: 0 }}
                    whileHover={{ x: 6 }}
                  >
                    Ver colección <ArrowRight size={15} />
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Men Category */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link to="/catalog?gender=men" className="group block relative overflow-hidden rounded-xl">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <motion.img
                  src="https://images.unsplash.com/photo-1759553126523-8e0efd65093d?w=800&q=85"
                  alt="Colección Caballero"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6 }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                  }}
                />
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'rgba(142,33,30,0.15)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p
                    className="text-xs uppercase mb-2"
                    style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.25em' }}
                  >
                    Colección
                  </p>
                  <h3
                    style={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                      letterSpacing: '0.08em',
                      color: '#fff',
                      lineHeight: 1,
                    }}
                  >
                    CABALLERO
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Slim · Regular · Skinny · Wide · Baggy
                  </p>
                  <motion.div
                    className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
                    style={{ color: '#fff' }}
                    initial={{ x: 0 }}
                    whileHover={{ x: 6 }}
                  >
                    Ver colección <ArrowRight size={15} />
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURED PRODUCTS
      ═══════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        style={{ borderTop: '1px solid #1a1a1a' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p
              className="text-xs uppercase mb-3"
              style={{ color: '#8e211e', letterSpacing: '0.3em' }}
            >
              Lo más popular
            </p>
            <h2
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                letterSpacing: '0.05em',
                color: '#fff',
                lineHeight: 1,
              }}
            >
              Productos Destacados
            </h2>
          </div>
          <Link
            to="/catalog"
            className="flex items-center gap-2 text-sm uppercase tracking-wider transition-colors"
            style={{ color: '#8e211e', letterSpacing: '0.1em', fontWeight: 600 }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#8e211e')}
          >
            Ver todo <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FULL-WIDTH EDITORIAL BANNER
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
        <img
          src="https://images.unsplash.com/photo-1771012266130-435928e57460?w=1600&q=85"
          alt="Editorial"
          className="w-full object-cover"
          style={{ height: '60vh', objectPosition: 'center 30%' }}
        />
        <div
          className="absolute inset-0 flex items-center"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="px-8 sm:px-16 lg:px-24 max-w-xl"
          >
            <p
              className="text-xs uppercase mb-4"
              style={{ color: '#8e211e', letterSpacing: '0.3em' }}
            >
              Colección Exclusiva
            </p>
            <h2
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                letterSpacing: '0.05em',
                color: '#fff',
                lineHeight: 0.95,
              }}
            >
              PREMIUM DENIM
              <br />
              <span style={{ color: '#8e211e' }}>2025</span>
            </h2>
            <p className="mt-4 mb-8 text-sm leading-relaxed" style={{ color: '#bbb' }}>
              Nuevos cortes, nuevos lavados. La colección más ambiciosa de Amatt Denim
              está aquí. Encuentra tu pieza perfecta.
            </p>
            <Link to="/catalog">
              <motion.button
                className="px-8 py-4 text-sm uppercase tracking-wider font-semibold"
                style={{
                  background: '#8e211e',
                  color: '#fff',
                  letterSpacing: '0.15em',
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Explorar Colección
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DIFFERENTIATORS
      ═══════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        style={{ borderTop: '1px solid #1a1a1a' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p
            className="text-xs uppercase mb-3"
            style={{ color: '#8e211e', letterSpacing: '0.3em' }}
          >
            ¿Por qué elegirnos?
          </p>
          <h2
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '0.05em',
              color: '#fff',
              lineHeight: 1,
            }}
          >
            La diferencia Amatt Denim
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-6 rounded-xl relative overflow-hidden cursor-default"
                style={{ background: '#111', border: '1px solid #1e1e1e' }}
                whileHover={{ y: -6, borderColor: 'rgba(142,33,30,0.5)' } as any}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 0%, rgba(142,33,30,0.12) 0%, transparent 70%)',
                  }}
                />
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'rgba(142,33,30,0.15)' }}
                >
                  <Icon size={22} style={{ color: '#8e211e' }} />
                </div>
                <div
                  className="mb-3"
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '2.5rem',
                    letterSpacing: '0.05em',
                    color: '#8e211e',
                    lineHeight: 1,
                  }}
                >
                  {item.stat}
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    color: '#fff',
                    fontSize: '1rem',
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666' }}>
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{ borderTop: '1px solid #1a1a1a', background: '#0a0a0a' }}
      >
        {/* Background watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(8rem, 20vw, 18rem)',
            color: 'rgba(255,255,255,0.015)',
            letterSpacing: '0.1em',
          }}
        >
          AMATT
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p
              className="text-xs uppercase mb-3"
              style={{ color: '#8e211e', letterSpacing: '0.3em' }}
            >
              Lo que dicen nuestros clientes
            </p>
            <h2
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                letterSpacing: '0.05em',
                color: '#fff',
                lineHeight: 1,
              }}
            >
              Opiniones Reales
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl relative"
                style={{ background: '#111', border: '1px solid #1e1e1e' }}
                whileHover={{ y: -4, borderColor: 'rgba(142,33,30,0.3)' } as any}
              >
                {/* Decorative quote */}
                <span
                  className="absolute top-4 right-5"
                  style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '4rem',
                    color: 'rgba(142,33,30,0.15)',
                    lineHeight: 1,
                  }}
                >
                  "
                </span>

                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={13} style={{ fill: '#8e211e', color: '#8e211e' }} />
                  ))}
                </div>

                <p className="text-sm leading-relaxed mb-5" style={{ color: '#bbb' }}>
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: '#8e211e', color: '#fff', fontFamily: 'Inter' }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#fff', fontFamily: 'Inter' }}>
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: '#555', fontFamily: 'Inter' }}>
                      {t.city} · {t.product}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: '#111', border: '1px solid #1e1e1e' }}
            >
              <CheckCircle2 size={14} style={{ color: '#2a9d52' }} />
              <span className="text-xs" style={{ color: '#666', fontFamily: 'Inter' }}>
                Reseñas verificadas de clientes reales en Cúcuta y área metropolitana
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DELIVERY CTA STRIP — SVG icons (no emojis)
      ═══════════════════════════════════════════════════════ */}
      <section
        className="py-12 px-4 sm:px-6"
        style={{ background: '#111', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {deliveryItems.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(142,33,30,0.15)',
                    border: '1px solid rgba(142,33,30,0.3)',
                  }}
                >
                  <Icon size={24} style={{ color: '#8e211e' }} />
                </div>
                <h4
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    color: '#fff',
                    fontSize: '1rem',
                  }}
                >
                  {title}
                </h4>
                <p className="text-sm" style={{ color: '#666', fontFamily: 'Inter' }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
