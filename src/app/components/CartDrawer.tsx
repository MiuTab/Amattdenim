import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router';

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
}

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } =
    useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[70] flex flex-col w-full max-w-md"
            style={{
              background: '#0f0f0f',
              borderLeft: '1px solid rgba(142,33,30,0.3)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid #1e1e1e' }}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} style={{ color: '#8e211e' }} />
                <span
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '1.4rem',
                    letterSpacing: '0.1em',
                    color: '#fff',
                  }}
                >
                  MI CARRITO
                </span>
                {totalItems > 0 && (
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white"
                    style={{ background: '#8e211e', fontFamily: 'Inter', fontWeight: 700 }}
                  >
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                style={{ color: '#aaa' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#aaa')}
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 text-center gap-4"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: '#1a1a1a' }}
                    >
                      <ShoppingBag size={28} style={{ color: '#444' }} />
                    </div>
                    <p
                      style={{
                        color: '#555',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.9rem',
                      }}
                    >
                      Tu carrito está vacío
                    </p>
                    <button
                      onClick={closeCart}
                      className="px-6 py-2 text-sm tracking-wider uppercase transition-all"
                      style={{
                        color: '#8e211e',
                        border: '1px solid #8e211e',
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: '0.1em',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#8e211e';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#8e211e';
                      }}
                    >
                      Seguir comprando
                    </button>
                  </motion.div>
                ) : (
                  items.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      layout
                      className="flex gap-4 p-3 rounded-lg"
                      style={{ background: '#181818' }}
                    >
                      {/* Image */}
                      <div className="w-20 h-24 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p
                              className="text-sm truncate"
                              style={{
                                color: '#fff',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 500,
                              }}
                            >
                              {item.name}
                            </p>
                            <p
                              className="text-xs mt-0.5"
                              style={{ color: '#666', fontFamily: 'Inter' }}
                            >
                              Talla: {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex-shrink-0 transition-colors"
                            style={{ color: '#444' }}
                            onMouseEnter={e =>
                              (e.currentTarget.style.color = '#8e211e')
                            }
                            onMouseLeave={e =>
                              (e.currentTarget.style.color = '#444')
                            }
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity */}
                          <div
                            className="flex items-center gap-2 rounded"
                            style={{
                              background: '#111',
                              border: '1px solid #2a2a2a',
                            }}
                          >
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-7 h-7 flex items-center justify-center transition-colors"
                              style={{ color: '#888' }}
                              onMouseEnter={e =>
                                (e.currentTarget.style.color = '#fff')
                              }
                              onMouseLeave={e =>
                                (e.currentTarget.style.color = '#888')
                              }
                            >
                              <Minus size={12} />
                            </button>
                            <span
                              className="w-5 text-center text-sm"
                              style={{ color: '#fff', fontFamily: 'Inter' }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-7 h-7 flex items-center justify-center transition-colors"
                              style={{ color: '#888' }}
                              onMouseEnter={e =>
                                (e.currentTarget.style.color = '#fff')
                              }
                              onMouseLeave={e =>
                                (e.currentTarget.style.color = '#888')
                              }
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Price */}
                          <span
                            style={{
                              color: '#fff',
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: 600,
                              fontSize: '0.95rem',
                            }}
                          >
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-5 space-y-4"
                style={{ borderTop: '1px solid #1e1e1e' }}
              >
                {/* Delivery badge */}
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded"
                  style={{ background: 'rgba(142,33,30,0.1)', border: '1px solid rgba(142,33,30,0.3)' }}
                >
                  <Truck size={18} style={{ color: '#8e211e' }} />
                  <p
                    className="text-xs"
                    style={{ color: '#ccc', fontFamily: 'Inter' }}
                  >
                    <strong style={{ color: '#fff' }}>Hacemos domicilios</strong> — Pago contraentrega
                  </p>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      color: '#aaa',
                      fontFamily: 'Inter',
                      fontSize: '0.9rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    TOTAL
                  </span>
                  <span
                    style={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: '1.6rem',
                      letterSpacing: '0.05em',
                      color: '#fff',
                    }}
                  >
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* CTA */}
                <motion.button
                  onClick={handleCheckout}
                  className="w-full py-4 flex items-center justify-center gap-3 text-sm tracking-widest uppercase font-medium transition-all"
                  style={{
                    background: '#8e211e',
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.15em',
                  }}
                  whileHover={{ scale: 1.02, background: '#a02520' } as any}
                  whileTap={{ scale: 0.98 }}
                >
                  Finalizar compra
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}