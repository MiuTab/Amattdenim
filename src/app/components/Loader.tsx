import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export function Loader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setShow(false), 400);
          return 100;
        }
        return p + Math.random() * 18;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#0d0d0d' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Animated threads background */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, #8e211e, transparent)',
                  top: `${12.5 * i + 6}%`,
                  left: 0,
                  right: 0,
                }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 2 + i * 0.2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>

          {/* Logo area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Brand name */}
            <div className="text-center">
              <motion.p
                className="tracking-[0.4em] text-sm mb-1"
                style={{ color: '#8e211e', fontFamily: 'Inter, sans-serif' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                BIENVENIDO A
              </motion.p>
              <motion.h1
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: 'clamp(3rem, 10vw, 5rem)',
                  letterSpacing: '0.1em',
                  color: '#ffffff',
                  lineHeight: 1,
                }}
                initial={{ opacity: 0, scaleX: 0.8 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                AMATT
              </motion.h1>
              <motion.h2
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                  letterSpacing: '0.5em',
                  color: '#8e211e',
                  lineHeight: 1,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                DENIM
              </motion.h2>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-px relative overflow-hidden" style={{ background: '#2a2a2a' }}>
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{ background: '#8e211e' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Tagline */}
            <motion.p
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: '#555', fontFamily: 'Inter, sans-serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Denim que define tu estilo
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
