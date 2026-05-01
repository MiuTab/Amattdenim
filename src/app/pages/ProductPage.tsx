import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ShoppingBag,
  Heart,
  Share2,
  Star,
  ChevronRight,
  CheckCircle2,
  Truck,
  Shield,
  RotateCcw,
  Zap,
  AlertTriangle,
} from 'lucide-react';
import { getProductById, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const product = getProductById(id || '');

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [tab, setTab] = useState<'desc' | 'care' | 'shipping'>('desc');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedSize('');
    setActiveImage(0);
    setQuantity(1);
    setAddedToCart(false);
  }, [id]);

  if (!product) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen gap-4"
        style={{ background: '#0d0d0d' }}
      >
        <p
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '3rem',
            color: '#333',
          }}
        >
          Producto no encontrado
        </p>
        <Link to="/catalog">
          <button
            className="px-6 py-3 text-sm uppercase tracking-wider"
            style={{
              background: '#8e211e',
              color: '#fff',
              fontFamily: 'Inter',
              letterSpacing: '0.1em',
            }}
          >
            Ver catálogo
          </button>
        </Link>
      </div>
    );
  }

  const related = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.images[0],
      quantity,
      category: product.category,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh', paddingTop: '5rem' }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs" style={{ color: '#555', fontFamily: 'Inter' }}>
          <Link
            to="/"
            className="transition-colors"
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >
            Inicio
          </Link>
          <ChevronRight size={10} />
          <Link
            to="/catalog"
            className="transition-colors"
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >
            Catálogo
          </Link>
          <ChevronRight size={10} />
          <Link
            to={`/catalog?gender=${product.category}`}
            className="transition-colors"
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >
            {product.category === 'women' ? 'Dama' : 'Caballero'}
          </Link>
          <ChevronRight size={10} />
          <span style={{ color: '#888' }}>{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main image */}
            <div
              className="relative overflow-hidden rounded-xl mb-4"
              style={{ background: '#111', aspectRatio: '3/4' }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              {/* Image nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage(
                        prev => (prev - 1 + product.images.length) % product.images.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImage(prev => (prev + 1) % product.images.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span
                    className="px-3 py-1 text-xs uppercase tracking-wider"
                    style={{
                      background: '#8e211e',
                      color: '#fff',
                      fontFamily: 'Inter',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                    }}
                  >
                    Nuevo
                  </span>
                )}
                {discount > 0 && (
                  <span
                    className="px-3 py-1 text-xs uppercase tracking-wider"
                    style={{
                      background: '#fff',
                      color: '#8e211e',
                      fontFamily: 'Inter',
                      fontWeight: 700,
                    }}
                  >
                    -{discount}%
                  </span>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => setWishlist(!wishlist)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <Heart
                  size={18}
                  style={{
                    color: wishlist ? '#8e211e' : '#fff',
                    fill: wishlist ? '#8e211e' : 'none',
                  }}
                />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="flex-1 overflow-hidden rounded-lg transition-all"
                  style={{
                    aspectRatio: '3/4',
                    border: activeImage === i ? '2px solid #8e211e' : '2px solid transparent',
                    opacity: activeImage === i ? 1 : 0.5,
                  }}
                >
                  <img
                    src={img}
                    alt={`${product.name} vista ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category badge */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className="px-3 py-1 text-xs uppercase tracking-wider rounded"
                style={{
                  background: 'rgba(142,33,30,0.15)',
                  color: '#8e211e',
                  fontFamily: 'Inter',
                  border: '1px solid rgba(142,33,30,0.3)',
                  letterSpacing: '0.12em',
                }}
              >
                {product.category === 'women' ? 'Dama' : 'Caballero'}
              </span>
              <span
                className="px-3 py-1 text-xs uppercase tracking-wider rounded"
                style={{
                  background: '#111',
                  color: '#666',
                  fontFamily: 'Inter',
                  border: '1px solid #2a2a2a',
                }}
              >
                {product.type}
              </span>
            </div>

            {/* Name */}
            <h1
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                letterSpacing: '0.05em',
                color: '#fff',
                lineHeight: 1.1,
              }}
            >
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    style={{
                      fill: i < 4 ? '#8e211e' : '#2a2a2a',
                      color: i < 4 ? '#8e211e' : '#2a2a2a',
                    }}
                  />
                ))}
              </div>
              <span className="text-sm" style={{ color: '#666', fontFamily: 'Inter' }}>
                4.8 · 12 reseñas
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mt-5 pb-5" style={{ borderBottom: '1px solid #1a1a1a' }}>
              <span
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '2.5rem',
                  letterSpacing: '0.05em',
                  color: product.isSale ? '#8e211e' : '#fff',
                  lineHeight: 1,
                }}
              >
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <div>
                  <span
                    className="line-through text-sm"
                    style={{ color: '#555', fontFamily: 'Inter' }}
                  >
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span
                    className="block text-xs"
                    style={{ color: '#2a9d52', fontFamily: 'Inter', fontWeight: 600 }}
                  >
                    Ahorras {formatPrice(product.originalPrice - product.price)}
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="py-5 space-y-2" style={{ borderBottom: '1px solid #1a1a1a' }}>
              <div className="flex gap-4 text-sm">
                <span style={{ color: '#555', fontFamily: 'Inter', minWidth: '80px' }}>Color:</span>
                <span style={{ color: '#ccc', fontFamily: 'Inter' }}>{product.color}</span>
              </div>
              <div className="flex gap-4 text-sm">
                <span style={{ color: '#555', fontFamily: 'Inter', minWidth: '80px' }}>Material:</span>
                <span style={{ color: '#ccc', fontFamily: 'Inter' }}>{product.material}</span>
              </div>
              {product.stock <= 8 && (
                <div className="flex items-center gap-2 mt-3 pt-2">
                  <Zap
                    size={13}
                    style={{ color: product.stock <= 4 ? '#8e211e' : '#e5993a', flexShrink: 0 }}
                  />
                  <span
                    className="text-xs"
                    style={{
                      color: product.stock <= 4 ? '#c44' : '#e5993a',
                      fontFamily: 'Inter',
                      fontWeight: 600,
                    }}
                  >
                    Solo {product.stock} unidades disponibles
                  </span>
                </div>
              )}
            </div>

            {/* Size selector */}
            <div className="py-5">
              <div className="flex items-center justify-between mb-4">
                <p
                  className="text-sm uppercase tracking-wider flex items-center gap-1.5"
                  style={{
                    color: sizeError ? '#8e211e' : '#aaa',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                  }}
                >
                  {sizeError && <AlertTriangle size={13} />}
                  {sizeError ? 'Selecciona una talla' : 'Selecciona tu talla'}
                </p>
                <button
                  className="text-xs underline transition-colors"
                  style={{ color: '#8e211e', fontFamily: 'Inter' }}
                >
                  Guía de tallas
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <motion.button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className="w-14 h-12 text-sm rounded transition-all"
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: 600,
                      background: selectedSize === size ? '#8e211e' : '#111',
                      color: selectedSize === size ? '#fff' : '#888',
                      border: `1.5px solid ${selectedSize === size ? '#8e211e' : sizeError ? '#8e211e44' : '#2a2a2a'}`,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex gap-3 mb-6">
              {/* Quantity */}
              <div
                className="flex items-center rounded overflow-hidden"
                style={{ border: '1px solid #2a2a2a', background: '#111' }}
              >
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-11 h-12 flex items-center justify-center transition-colors"
                  style={{ color: '#888' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#888')}
                >
                  -
                </button>
                <span
                  className="w-10 text-center"
                  style={{ color: '#fff', fontFamily: 'Inter', fontWeight: 600 }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-11 h-12 flex items-center justify-center transition-colors"
                  style={{ color: '#888' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#888')}
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <motion.button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 h-12 text-sm uppercase tracking-wider font-semibold"
                style={{
                  background: addedToCart ? '#2a7a3a' : '#8e211e',
                  color: '#fff',
                  fontFamily: 'Inter',
                  letterSpacing: '0.12em',
                  transition: 'background 0.3s',
                }}
                whileHover={!addedToCart ? { scale: 1.02 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {addedToCart ? (
                    <motion.div
                      key="added"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 size={16} />
                      ¡Agregado al carrito!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="add"
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag size={16} />
                      Agregar al carrito
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Benefits */}
            <div
              className="p-4 rounded-xl space-y-3"
              style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}
            >
              {[
                { icon: Truck, text: 'Domicilio disponible en Cúcuta y área metropolitana' },
                { icon: Shield, text: 'Pago contraentrega — paga cuando recibas' },
                { icon: RotateCcw, text: 'Cambios disponibles en caso de inconvenientes' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <Icon size={15} style={{ color: '#8e211e', flexShrink: 0 }} />
                    <span className="text-xs" style={{ color: '#777', fontFamily: 'Inter' }}>
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div
                className="flex gap-6 pb-3"
                style={{ borderBottom: '1px solid #1a1a1a' }}
              >
                {(['desc', 'care', 'shipping'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="text-xs uppercase tracking-wider pb-3 transition-all relative"
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: 600,
                      color: tab === t ? '#fff' : '#555',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {t === 'desc' ? 'Descripción' : t === 'care' ? 'Cuidados' : 'Envíos'}
                    {tab === t && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ background: '#8e211e' }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="pt-4"
                >
                  {tab === 'desc' && (
                    <p className="text-sm leading-relaxed" style={{ color: '#888', fontFamily: 'Inter' }}>
                      {product.description}
                    </p>
                  )}
                  {tab === 'care' && (
                    <ul className="space-y-2">
                      {[
                        'Lavar a máquina a 30°C',
                        'No usar secadora',
                        'Planchar a temperatura baja',
                        'No usar blanqueador',
                        'Lavar por separado las primeras veces',
                      ].map((care, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm" style={{ color: '#888', fontFamily: 'Inter' }}>
                          <span style={{ color: '#8e211e' }}>·</span> {care}
                        </li>
                      ))}
                    </ul>
                  )}
                  {tab === 'shipping' && (
                    <div className="space-y-4">
                      {[
                        { title: 'Domicilio en Cúcuta', desc: 'Entrega el mismo día o día siguiente' },
                        { title: 'Pago contraentrega', desc: 'Paga cuando recibas tu pedido' },
                        { title: 'Recogida en tienda', desc: 'Calle 6Bn #2e-236 Ceiba 2' },
                      ].map((s, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={14} style={{ color: '#2a9d52', marginTop: '2px' }} />
                          <div>
                            <p className="text-sm font-medium" style={{ color: '#fff', fontFamily: 'Inter' }}>{s.title}</p>
                            <p className="text-xs" style={{ color: '#666', fontFamily: 'Inter' }}>{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 pt-12" style={{ borderTop: '1px solid #1a1a1a' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: '#8e211e', fontFamily: 'Inter' }}
              >
                También te puede gustar
              </p>
              <h2
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  letterSpacing: '0.05em',
                  color: '#fff',
                }}
              >
                Productos Relacionados
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}