import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, Star, Zap } from 'lucide-react';
import { Link } from 'react-router';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
}

// Deterministic rating decimal per product — avoids Math.random() re-render warning
function getRatingDecimal(id: string): number {
  const code = id.charCodeAt(id.length - 1);
  return 5 + (code % 5);
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[Math.floor(product.sizes.length / 2)];
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: defaultSize,
      image: product.images[0],
      quantity: 1,
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="block group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="relative overflow-hidden rounded-lg"
          style={{ background: '#151515', aspectRatio: '3/4' }}
        >
          {/* Image */}
          <motion.img
            src={hovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
            }}
            animate={{ opacity: hovered ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span
                className="px-2.5 py-1 text-xs tracking-widest uppercase"
                style={{
                  background: '#8e211e',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  fontSize: '0.6rem',
                }}
              >
                NUEVO
              </span>
            )}
            {product.isSale && (
              <span
                className="px-2.5 py-1 text-xs tracking-widest uppercase"
                style={{
                  background: '#222',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  fontSize: '0.6rem',
                  border: '1px solid #8e211e',
                }}
              >
                OFERTA
              </span>
            )}
            {product.stock <= 5 && (
              <span
                className="px-2.5 py-1 text-xs tracking-widest uppercase"
                style={{
                  background: 'rgba(0,0,0,0.8)',
                  color: '#f5c842',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  fontSize: '0.6rem',
                }}
              >
                <Zap size={9} className="inline mr-0.5" />ÚLTIMAS
              </span>
            )}
          </div>

          {/* Quick view on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.button
              onClick={handleQuickAdd}
              className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider transition-all"
              style={{
                background: added ? '#2a7a3a' : '#8e211e',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.1em',
                fontWeight: 600,
                backdropFilter: 'blur(8px)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <ShoppingBag size={13} />
              {added ? '¡Agregado!' : 'Agregar'}
            </motion.button>
            <motion.div
              className="w-10 h-10 flex items-center justify-center rounded-full"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
              whileHover={{ scale: 1.1 }}
            >
              <Eye size={15} style={{ color: '#fff' }} />
            </motion.div>
          </motion.div>

          {/* Stock indicator */}
          {product.stock <= 5 && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="h-1 rounded-full overflow-hidden" style={{ background: '#2a2a2a' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    background: product.stock <= 3 ? '#8e211e' : '#e5993a',
                    width: `${(product.stock / 20) * 100}%`,
                  }}
                />
              </div>
              <p
                className="text-xs mt-1 flex items-center gap-1"
                style={{ color: '#aaa', fontFamily: 'Inter', fontSize: '0.65rem' }}
              >
                <Zap size={9} style={{ color: '#e5993a' }} />
                Solo {product.stock} disponibles
              </p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-3 px-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p
                className="text-sm transition-colors"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  color: hovered ? '#fff' : '#ddd',
                  letterSpacing: '0.02em',
                }}
              >
                {product.name}
              </p>
              <p
                className="text-xs mt-0.5 capitalize"
                style={{ color: '#666', fontFamily: 'Inter' }}
              >
                {product.category === 'women' ? 'Dama' : 'Caballero'} · {product.type}
              </p>
            </div>
            <div className="text-right">
              {product.originalPrice && (
                <p
                  className="text-xs line-through"
                  style={{ color: '#555', fontFamily: 'Inter' }}
                >
                  {formatPrice(product.originalPrice)}
                </p>
              )}
              <p
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '1.1rem',
                  letterSpacing: '0.05em',
                  color: product.isSale ? '#8e211e' : '#fff',
                }}
              >
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 mt-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                style={{
                  fill: i < 4 ? '#8e211e' : '#333',
                  color: i < 4 ? '#8e211e' : '#333',
                }}
              />
            ))}
            <span
              className="text-xs ml-1"
              style={{ color: '#555', fontFamily: 'Inter' }}
            >
              (4.{getRatingDecimal(product.id)})
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}