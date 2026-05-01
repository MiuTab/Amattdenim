import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import {
  ChevronRight,
  CheckCircle2,
  Truck,
  CreditCard,
  User,
  Phone,
  MapPin,
  ShoppingBag,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
}

type Step = 'contact' | 'address' | 'review' | 'success';

const STEPS: { id: Step; label: string }[] = [
  { id: 'contact', label: 'Contacto' },
  { id: 'address', label: 'Dirección' },
  { id: 'review', label: 'Confirmar' },
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  neighborhood: string;
  notes: string;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('contact');
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Cúcuta',
    neighborhood: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const updateField = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateContact = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Nombre requerido';
    if (!form.phone.trim() || form.phone.length < 7) e.phone = 'Teléfono inválido';
    return e;
  };

  const validateAddress = () => {
    const e: Partial<FormData> = {};
    if (!form.address.trim()) e.address = 'Dirección requerida';
    if (!form.neighborhood.trim()) e.neighborhood = 'Barrio requerido';
    return e;
  };

  const handleNext = () => {
    if (step === 'contact') {
      const e = validateContact();
      if (Object.keys(e).length > 0) { setErrors(e); return; }
      setStep('address');
    } else if (step === 'address') {
      const e = validateAddress();
      if (Object.keys(e).length > 0) { setErrors(e); return; }
      setStep('review');
    } else if (step === 'review') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setProcessing(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2200));
    setProcessing(false);
    clearCart();
    setStep('success');
  };

  const stepIndex = STEPS.findIndex(s => s.id === step);

  if (items.length === 0 && step !== 'success') {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen gap-5"
        style={{ background: '#0d0d0d', paddingTop: '5rem' }}
      >
        <ShoppingBag size={48} style={{ color: '#333' }} />
        <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', color: '#555', letterSpacing: '0.1em' }}>
          Tu carrito está vacío
        </p>
        <Link to="/catalog">
          <button
            className="px-8 py-3 text-sm uppercase tracking-wider"
            style={{ background: '#8e211e', color: '#fff', fontFamily: 'Inter', letterSpacing: '0.12em' }}
          >
            Ver productos
          </button>
        </Link>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen px-4"
        style={{ background: '#0d0d0d', paddingTop: '5rem' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.7 }}
          className="text-center max-w-lg"
        >
          {/* Animated success ring */}
          <div className="relative w-28 h-28 mx-auto mb-8">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '2px solid #8e211e' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(142,33,30,0.15)', border: '2px solid #8e211e' }}
            >
              <CheckCircle2 size={52} style={{ color: '#8e211e' }} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                letterSpacing: '0.05em',
                color: '#fff',
                lineHeight: 1,
              }}
            >
              ¡Pedido Confirmado!
            </h1>
            <p className="mt-4 text-base leading-relaxed" style={{ color: '#888', fontFamily: 'Inter' }}>
              Hola <strong style={{ color: '#fff' }}>{form.name}</strong>, recibimos tu pedido.
              Nos pondremos en contacto al <strong style={{ color: '#fff' }}>{form.phone}</strong> para
              coordinar el domicilio.
            </p>

            <div
              className="mt-6 p-5 rounded-xl text-left"
              style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}
            >
              <p
                className="text-xs uppercase tracking-wider mb-4"
                style={{ color: '#8e211e', fontFamily: 'Inter', fontWeight: 600, letterSpacing: '0.2em' }}
              >
                Resumen del pedido
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#666', fontFamily: 'Inter' }}>Dirección de entrega:</span>
                  <span style={{ color: '#ccc', fontFamily: 'Inter' }}>{form.address}, {form.neighborhood}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#666', fontFamily: 'Inter' }}>Ciudad:</span>
                  <span style={{ color: '#ccc', fontFamily: 'Inter' }}>{form.city}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#666', fontFamily: 'Inter' }}>Pago:</span>
                  <span style={{ color: '#2a9d52', fontFamily: 'Inter', fontWeight: 600 }}>Contraentrega</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 px-5 py-3 rounded" style={{ background: 'rgba(42,157,82,0.1)' }}>
              <Truck size={16} style={{ color: '#2a9d52' }} />
              <p className="text-sm" style={{ color: '#2a9d52', fontFamily: 'Inter' }}>
                Tu pedido llegará en 1 día hábil
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link to="/" className="flex-1">
                <motion.button
                  className="w-full py-3 text-sm uppercase tracking-wider"
                  style={{
                    background: 'transparent',
                    color: '#aaa',
                    border: '1px solid #2a2a2a',
                    fontFamily: 'Inter',
                    letterSpacing: '0.1em',
                  }}
                  whileHover={{ borderColor: '#fff', color: '#fff' } as any}
                >
                  Ir al inicio
                </motion.button>
              </Link>
              <Link to="/catalog" className="flex-1">
                <motion.button
                  className="w-full py-3 text-sm uppercase tracking-wider font-semibold"
                  style={{
                    background: '#8e211e',
                    color: '#fff',
                    fontFamily: 'Inter',
                    letterSpacing: '0.1em',
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  Seguir comprando
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh', paddingTop: '5rem' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link to="/catalog">
              <button
                className="flex items-center gap-2 text-sm mb-2 transition-colors"
                style={{ color: '#666', fontFamily: 'Inter' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#666')}
              >
                <ArrowLeft size={14} />
                Volver al catálogo
              </button>
            </Link>
            <h1
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                letterSpacing: '0.05em',
                color: '#fff',
                lineHeight: 1,
              }}
            >
              Finalizar Compra
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <Lock size={14} style={{ color: '#666' }} />
            <span className="text-xs" style={{ color: '#666', fontFamily: 'Inter' }}>
              Compra segura
            </span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background:
                      i < stepIndex
                        ? '#2a9d52'
                        : i === stepIndex
                        ? '#8e211e'
                        : '#1a1a1a',
                    color: i <= stepIndex ? '#fff' : '#555',
                    fontFamily: 'Inter',
                    border: `2px solid ${
                      i === stepIndex ? '#8e211e' : i < stepIndex ? '#2a9d52' : '#2a2a2a'
                    }`,
                  }}
                >
                  {i < stepIndex ? <CheckCircle2 size={14} /> : i + 1}
                </div>
                <span
                  className="text-xs uppercase tracking-wider hidden sm:block"
                  style={{
                    color: i === stepIndex ? '#fff' : i < stepIndex ? '#2a9d52' : '#555',
                    fontFamily: 'Inter',
                    fontWeight: i === stepIndex ? 600 : 400,
                    letterSpacing: '0.1em',
                  }}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 h-px mx-1"
                  style={{
                    background: i < stepIndex ? '#2a9d52' : '#2a2a2a',
                    width: '40px',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div
                    className="p-6 rounded-xl"
                    style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <User size={16} style={{ color: '#8e211e' }} />
                      <h2
                        className="text-sm uppercase tracking-wider"
                        style={{ fontFamily: 'Inter', fontWeight: 600, color: '#fff', letterSpacing: '0.15em' }}
                      >
                        Información de Contacto
                      </h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs mb-1.5 uppercase tracking-wider" style={{ color: '#666', fontFamily: 'Inter', letterSpacing: '0.1em' }}>
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={e => updateField('name', e.target.value)}
                          placeholder="Tu nombre completo"
                          className="w-full px-4 py-3 text-sm rounded outline-none transition-all"
                          style={{
                            background: '#111',
                            border: `1px solid ${errors.name ? '#8e211e' : '#2a2a2a'}`,
                            color: '#fff',
                            fontFamily: 'Inter',
                          }}
                          onFocus={e => (e.target.style.borderColor = '#8e211e')}
                          onBlur={e => (e.target.style.borderColor = errors.name ? '#8e211e' : '#2a2a2a')}
                        />
                        {errors.name && <p className="text-xs mt-1" style={{ color: '#c44', fontFamily: 'Inter' }}>{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs mb-1.5 uppercase tracking-wider" style={{ color: '#666', fontFamily: 'Inter', letterSpacing: '0.1em' }}>
                          Teléfono / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={e => updateField('phone', e.target.value)}
                          placeholder="300 000 0000"
                          className="w-full px-4 py-3 text-sm rounded outline-none transition-all"
                          style={{
                            background: '#111',
                            border: `1px solid ${errors.phone ? '#8e211e' : '#2a2a2a'}`,
                            color: '#fff',
                            fontFamily: 'Inter',
                          }}
                          onFocus={e => (e.target.style.borderColor = '#8e211e')}
                          onBlur={e => (e.target.style.borderColor = errors.phone ? '#8e211e' : '#2a2a2a')}
                        />
                        {errors.phone && <p className="text-xs mt-1" style={{ color: '#c44', fontFamily: 'Inter' }}>{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-xs mb-1.5 uppercase tracking-wider" style={{ color: '#666', fontFamily: 'Inter', letterSpacing: '0.1em' }}>
                          Correo electrónico (opcional)
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => updateField('email', e.target.value)}
                          placeholder="tu@correo.com"
                          className="w-full px-4 py-3 text-sm rounded outline-none transition-all"
                          style={{
                            background: '#111',
                            border: '1px solid #2a2a2a',
                            color: '#fff',
                            fontFamily: 'Inter',
                          }}
                          onFocus={e => (e.target.style.borderColor = '#8e211e')}
                          onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'address' && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div
                    className="p-6 rounded-xl"
                    style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <MapPin size={16} style={{ color: '#8e211e' }} />
                      <h2
                        className="text-sm uppercase tracking-wider"
                        style={{ fontFamily: 'Inter', fontWeight: 600, color: '#fff', letterSpacing: '0.15em' }}
                      >
                        Dirección de Entrega
                      </h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs mb-1.5 uppercase tracking-wider" style={{ color: '#666', fontFamily: 'Inter', letterSpacing: '0.1em' }}>
                          Dirección *
                        </label>
                        <input
                          type="text"
                          value={form.address}
                          onChange={e => updateField('address', e.target.value)}
                          placeholder="Calle, Carrera, Avenida..."
                          className="w-full px-4 py-3 text-sm rounded outline-none transition-all"
                          style={{
                            background: '#111',
                            border: `1px solid ${errors.address ? '#8e211e' : '#2a2a2a'}`,
                            color: '#fff',
                            fontFamily: 'Inter',
                          }}
                          onFocus={e => (e.target.style.borderColor = '#8e211e')}
                          onBlur={e => (e.target.style.borderColor = errors.address ? '#8e211e' : '#2a2a2a')}
                        />
                        {errors.address && <p className="text-xs mt-1" style={{ color: '#c44', fontFamily: 'Inter' }}>{errors.address}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs mb-1.5 uppercase tracking-wider" style={{ color: '#666', fontFamily: 'Inter', letterSpacing: '0.1em' }}>
                            Barrio *
                          </label>
                          <input
                            type="text"
                            value={form.neighborhood}
                            onChange={e => updateField('neighborhood', e.target.value)}
                            placeholder="Tu barrio"
                            className="w-full px-4 py-3 text-sm rounded outline-none transition-all"
                            style={{
                              background: '#111',
                              border: `1px solid ${errors.neighborhood ? '#8e211e' : '#2a2a2a'}`,
                              color: '#fff',
                              fontFamily: 'Inter',
                            }}
                            onFocus={e => (e.target.style.borderColor = '#8e211e')}
                            onBlur={e => (e.target.style.borderColor = errors.neighborhood ? '#8e211e' : '#2a2a2a')}
                          />
                          {errors.neighborhood && <p className="text-xs mt-1" style={{ color: '#c44', fontFamily: 'Inter' }}>{errors.neighborhood}</p>}
                        </div>
                        <div>
                          <label className="block text-xs mb-1.5 uppercase tracking-wider" style={{ color: '#666', fontFamily: 'Inter', letterSpacing: '0.1em' }}>
                            Ciudad
                          </label>
                          <input
                            type="text"
                            value={form.city}
                            onChange={e => updateField('city', e.target.value)}
                            className="w-full px-4 py-3 text-sm rounded outline-none"
                            style={{
                              background: '#0a0a0a',
                              border: '1px solid #1a1a1a',
                              color: '#666',
                              fontFamily: 'Inter',
                            }}
                            readOnly
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs mb-1.5 uppercase tracking-wider" style={{ color: '#666', fontFamily: 'Inter', letterSpacing: '0.1em' }}>
                          Notas adicionales (opcional)
                        </label>
                        <textarea
                          value={form.notes}
                          onChange={e => updateField('notes', e.target.value)}
                          placeholder="Instrucciones especiales para la entrega..."
                          rows={3}
                          className="w-full px-4 py-3 text-sm rounded outline-none resize-none transition-all"
                          style={{
                            background: '#111',
                            border: '1px solid #2a2a2a',
                            color: '#fff',
                            fontFamily: 'Inter',
                          }}
                          onFocus={e => (e.target.style.borderColor = '#8e211e')}
                          onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {/* Contact review */}
                  <div
                    className="p-5 rounded-xl"
                    style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <User size={14} style={{ color: '#8e211e' }} />
                        <span className="text-xs uppercase tracking-wider" style={{ fontFamily: 'Inter', fontWeight: 600, color: '#fff', letterSpacing: '0.12em' }}>
                          Contacto
                        </span>
                      </div>
                      <button className="text-xs" style={{ color: '#8e211e', fontFamily: 'Inter' }} onClick={() => setStep('contact')}>
                        Editar
                      </button>
                    </div>
                    <p className="text-sm" style={{ color: '#ccc', fontFamily: 'Inter' }}>{form.name}</p>
                    <p className="text-sm" style={{ color: '#888', fontFamily: 'Inter' }}>{form.phone}</p>
                    {form.email && <p className="text-sm" style={{ color: '#888', fontFamily: 'Inter' }}>{form.email}</p>}
                  </div>

                  {/* Address review */}
                  <div
                    className="p-5 rounded-xl"
                    style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} style={{ color: '#8e211e' }} />
                        <span className="text-xs uppercase tracking-wider" style={{ fontFamily: 'Inter', fontWeight: 600, color: '#fff', letterSpacing: '0.12em' }}>
                          Dirección de entrega
                        </span>
                      </div>
                      <button className="text-xs" style={{ color: '#8e211e', fontFamily: 'Inter' }} onClick={() => setStep('address')}>
                        Editar
                      </button>
                    </div>
                    <p className="text-sm" style={{ color: '#ccc', fontFamily: 'Inter' }}>
                      {form.address}
                    </p>
                    <p className="text-sm" style={{ color: '#888', fontFamily: 'Inter' }}>
                      {form.neighborhood}, {form.city}
                    </p>
                    {form.notes && (
                      <p className="text-xs mt-2" style={{ color: '#666', fontFamily: 'Inter' }}>
                        Nota: {form.notes}
                      </p>
                    )}
                  </div>

                  {/* Payment */}
                  <div
                    className="p-5 rounded-xl"
                    style={{
                      background: 'rgba(42,157,82,0.08)',
                      border: '1px solid rgba(42,157,82,0.3)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard size={14} style={{ color: '#2a9d52' }} />
                      <span
                        className="text-sm font-semibold"
                        style={{ color: '#2a9d52', fontFamily: 'Inter' }}
                      >
                        Pago Contraentrega
                      </span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: '#4a8a5a', fontFamily: 'Inter' }}>
                      Pagas en efectivo cuando recibas tu pedido. Sin riesgos.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-6">
              {stepIndex > 0 && (
                <button
                  onClick={() => setStep(STEPS[stepIndex - 1].id)}
                  className="flex items-center gap-2 px-5 py-3 text-sm transition-colors"
                  style={{
                    color: '#aaa',
                    border: '1px solid #2a2a2a',
                    background: 'transparent',
                    fontFamily: 'Inter',
                    letterSpacing: '0.08em',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
                >
                  <ArrowLeft size={14} />
                  Atrás
                </button>
              )}
              <motion.button
                onClick={handleNext}
                disabled={processing}
                className="flex-1 flex items-center justify-center gap-3 py-4 text-sm uppercase tracking-wider font-semibold"
                style={{
                  background: processing ? '#6a1715' : '#8e211e',
                  color: '#fff',
                  fontFamily: 'Inter',
                  letterSpacing: '0.15em',
                  opacity: processing ? 0.8 : 1,
                }}
                whileHover={!processing ? { scale: 1.02 } : {}}
                whileTap={!processing ? { scale: 0.98 } : {}}
              >
                {processing ? (
                  <motion.div
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      className="w-4 h-4 border-2 rounded-full border-t-transparent"
                      style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'transparent' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Procesando...
                  </motion.div>
                ) : step === 'review' ? (
                  <>
                    <CheckCircle2 size={16} />
                    Confirmar Pedido
                  </>
                ) : (
                  <>
                    Continuar
                    <ChevronRight size={16} />
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div
              className="sticky top-24 rounded-xl overflow-hidden"
              style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}
            >
              <div
                className="px-5 py-4"
                style={{ borderBottom: '1px solid #1a1a1a' }}
              >
                <h3
                  className="text-sm uppercase tracking-wider"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.15em',
                  }}
                >
                  Tu pedido ({items.length})
                </h3>
              </div>

              <div className="px-5 py-4 space-y-4 max-h-72 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-16 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium" style={{ color: '#ddd', fontFamily: 'Inter' }}>
                        {item.name}
                      </p>
                      <p className="text-xs" style={{ color: '#666', fontFamily: 'Inter' }}>
                        Talla {item.size} · ×{item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: '#fff', fontFamily: 'Inter' }}>
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="px-5 py-4 space-y-3"
                style={{ borderTop: '1px solid #1a1a1a' }}
              >
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#666', fontFamily: 'Inter' }}>Subtotal</span>
                  <span style={{ color: '#ccc', fontFamily: 'Inter' }}>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#666', fontFamily: 'Inter' }}>Domicilio</span>
                  <span style={{ color: '#2a9d52', fontFamily: 'Inter', fontWeight: 600 }}>A convenir</span>
                </div>
                <div
                  className="flex justify-between pt-3"
                  style={{ borderTop: '1px solid #1a1a1a' }}
                >
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: 700,
                      color: '#fff',
                      fontSize: '0.9rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: '1.5rem',
                      letterSpacing: '0.05em',
                      color: '#fff',
                    }}
                  >
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <div
                className="px-5 py-4"
                style={{ background: 'rgba(142,33,30,0.06)', borderTop: '1px solid rgba(142,33,30,0.2)' }}
              >
                <div className="flex items-center gap-2">
                  <Truck size={14} style={{ color: '#8e211e' }} />
                  <p className="text-xs" style={{ color: '#aaa', fontFamily: 'Inter' }}>
                    <strong style={{ color: '#fff' }}>Pago contraentrega</strong> — Pagas al recibir
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
