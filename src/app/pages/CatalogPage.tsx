import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';

type Gender = 'all' | 'women' | 'men';
type FitType = 'all' | 'skinny' | 'slim' | 'regular' | 'wide' | 'boyfriend' | 'mom' | 'flare' | 'baggy';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

const typeLabels: Record<string, string> = {
  all: 'Todos los cortes',
  skinny: 'Skinny',
  slim: 'Slim',
  regular: 'Regular',
  wide: 'Wide Leg',
  boyfriend: 'Boyfriend',
  mom: 'Mom Jean',
  flare: 'Flare',
  baggy: 'Baggy',
};

const SIZES_WOMEN = ['24', '25', '26', '27', '28', '29', '30', '31'];
const SIZES_MEN = ['28', '29', '30', '31', '32', '33', '34', '36', '38'];

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const initialGender = (searchParams.get('gender') as Gender) || 'all';

  const [gender, setGender] = useState<Gender>(initialGender);
  const [fitType, setFitType] = useState<FitType>('all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [sort, setSort] = useState<SortOption>('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    const g = searchParams.get('gender') as Gender;
    if (g) setGender(g);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (gender !== 'all') {
      list = list.filter(p => p.category === gender);
    }
    if (fitType !== 'all') {
      list = list.filter(p => p.type === fitType);
    }
    if (selectedSizes.length > 0) {
      list = list.filter(p => selectedSizes.some(s => p.sizes.includes(s)));
    }
    list = list.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [gender, fitType, selectedSizes, priceRange, sort]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setGender('all');
    setFitType('all');
    setSelectedSizes([]);
    setPriceRange([0, 200000]);
  };

  const hasFilters =
    gender !== 'all' ||
    fitType !== 'all' ||
    selectedSizes.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 200000;

  const sizes = gender === 'men' ? SIZES_MEN : gender === 'women' ? SIZES_WOMEN : [...SIZES_WOMEN, ...SIZES_MEN.filter(s => !SIZES_WOMEN.includes(s))];

  const sortLabels: Record<SortOption, string> = {
    featured: 'Destacados',
    'price-asc': 'Menor precio',
    'price-desc': 'Mayor precio',
    newest: 'Más nuevos',
  };

  return (
    <div
      style={{ background: '#0d0d0d', minHeight: '100vh', paddingTop: '5rem' }}
    >
      {/* Header */}
      <div
        className="relative overflow-hidden py-16 px-4 sm:px-6"
        style={{ background: '#0a0a0a', borderBottom: '1px solid #1a1a1a' }}
      >
        <div
          className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-end pr-10"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(6rem, 20vw, 14rem)',
            color: 'rgba(255,255,255,0.025)',
            letterSpacing: '0.05em',
          }}
        >
          JEANS
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: '#8e211e', fontFamily: 'Inter', letterSpacing: '0.25em' }}
            >
              Amatt Denim
            </p>
            <h1
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                letterSpacing: '0.05em',
                color: '#fff',
                lineHeight: 1,
              }}
            >
              {gender === 'women'
                ? 'Colección Dama'
                : gender === 'men'
                ? 'Colección Caballero'
                : 'Catálogo Completo'}
            </h1>
            <p
              className="mt-3 text-sm"
              style={{ color: '#666', fontFamily: 'Inter' }}
            >
              {filtered.length} producto{filtered.length !== 1 ? 's' : ''} encontrado
              {filtered.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6"
          style={{ borderBottom: '1px solid #1a1a1a' }}
        >
          {/* Gender tabs */}
          <div className="flex gap-1 p-1 rounded-lg" style={{ background: '#111' }}>
            {(['all', 'women', 'men'] as const).map(g => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className="px-5 py-2.5 text-xs uppercase tracking-wider rounded transition-all duration-200"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  background: gender === g ? '#8e211e' : 'transparent',
                  color: gender === g ? '#fff' : '#666',
                }}
              >
                {g === 'all' ? 'Todo' : g === 'women' ? 'Dama' : 'Caballero'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Filters button */}
            <motion.button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded text-xs uppercase tracking-wider transition-all"
              style={{
                background: filtersOpen ? '#8e211e' : '#111',
                color: filtersOpen ? '#fff' : '#aaa',
                border: `1px solid ${filtersOpen ? '#8e211e' : '#2a2a2a'}`,
                fontFamily: 'Inter',
                letterSpacing: '0.1em',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <SlidersHorizontal size={13} />
              Filtros
              {hasFilters && (
                <span
                  className="w-4 h-4 rounded-full text-white flex items-center justify-center"
                  style={{ background: '#fff', color: '#8e211e', fontSize: '0.6rem', fontWeight: 700 }}
                >
                  !
                </span>
              )}
            </motion.button>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded text-xs uppercase tracking-wider"
                style={{
                  background: '#111',
                  color: '#aaa',
                  border: '1px solid #2a2a2a',
                  fontFamily: 'Inter',
                  letterSpacing: '0.1em',
                }}
              >
                {sortLabels[sort]}
                <ChevronDown size={12} />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-full mt-2 w-44 rounded overflow-hidden shadow-xl z-20"
                    style={{ background: '#111', border: '1px solid #2a2a2a' }}
                  >
                    {(Object.entries(sortLabels) as [SortOption, string][]).map(
                      ([key, label]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSort(key);
                            setSortOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left text-xs uppercase tracking-wider transition-colors"
                          style={{
                            fontFamily: 'Inter',
                            color: sort === key ? '#fff' : '#666',
                            background: sort === key ? 'rgba(142,33,30,0.2)' : 'transparent',
                            borderBottom: '1px solid #1a1a1a',
                            letterSpacing: '0.08em',
                          }}
                          onMouseEnter={e =>
                            (e.currentTarget.style.color = '#fff')
                          }
                          onMouseLeave={e =>
                            (e.currentTarget.style.color =
                              sort === key ? '#fff' : '#666')
                          }
                        >
                          {label}
                        </button>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2.5 text-xs transition-colors"
                style={{ color: '#8e211e', fontFamily: 'Inter', letterSpacing: '0.05em' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8e211e')}
              >
                <X size={12} />
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Expandable filters panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div
                className="p-6 rounded-xl"
                style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {/* Type */}
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest mb-4"
                      style={{
                        color: '#8e211e',
                        fontFamily: 'Inter',
                        letterSpacing: '0.2em',
                      }}
                    >
                      Tipo de corte
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          'all',
                          'skinny',
                          'slim',
                          'regular',
                          'wide',
                          'boyfriend',
                          'mom',
                          'flare',
                          'baggy',
                        ] as FitType[]
                      ).map(t => (
                        <button
                          key={t}
                          onClick={() => setFitType(t)}
                          className="px-3 py-1.5 text-xs rounded transition-all"
                          style={{
                            fontFamily: 'Inter',
                            background:
                              fitType === t ? '#8e211e' : '#1a1a1a',
                            color: fitType === t ? '#fff' : '#888',
                            border: `1px solid ${fitType === t ? '#8e211e' : '#2a2a2a'}`,
                          }}
                        >
                          {typeLabels[t]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest mb-4"
                      style={{
                        color: '#8e211e',
                        fontFamily: 'Inter',
                        letterSpacing: '0.2em',
                      }}
                    >
                      Talla
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map(s => (
                        <button
                          key={s}
                          onClick={() => toggleSize(s)}
                          className="w-11 h-11 text-xs rounded transition-all"
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            background: selectedSizes.includes(s)
                              ? '#8e211e'
                              : '#1a1a1a',
                            color: selectedSizes.includes(s) ? '#fff' : '#888',
                            border: `1px solid ${selectedSizes.includes(s) ? '#8e211e' : '#2a2a2a'}`,
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest mb-4"
                      style={{
                        color: '#8e211e',
                        fontFamily: 'Inter',
                        letterSpacing: '0.2em',
                      }}
                    >
                      Precio máximo
                    </p>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min={0}
                        max={200000}
                        step={10000}
                        value={priceRange[1]}
                        onChange={e =>
                          setPriceRange([priceRange[0], parseInt(e.target.value)])
                        }
                        className="w-full"
                        style={{ accentColor: '#8e211e' }}
                      />
                      <div className="flex justify-between">
                        <span
                          className="text-xs"
                          style={{ color: '#666', fontFamily: 'Inter' }}
                        >
                          $0
                        </span>
                        <span
                          className="text-sm font-medium"
                          style={{ color: '#fff', fontFamily: 'Inter' }}
                        >
                          {new Intl.NumberFormat('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                            minimumFractionDigits: 0,
                          }).format(priceRange[1])}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filter chips */}
        {hasFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {gender !== 'all' && (
              <span
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                style={{
                  background: 'rgba(142,33,30,0.15)',
                  border: '1px solid rgba(142,33,30,0.3)',
                  color: '#e88',
                  fontFamily: 'Inter',
                }}
              >
                {gender === 'women' ? 'Dama' : 'Caballero'}
                <button onClick={() => setGender('all')}>
                  <X size={10} />
                </button>
              </span>
            )}
            {fitType !== 'all' && (
              <span
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                style={{
                  background: 'rgba(142,33,30,0.15)',
                  border: '1px solid rgba(142,33,30,0.3)',
                  color: '#e88',
                  fontFamily: 'Inter',
                }}
              >
                {typeLabels[fitType]}
                <button onClick={() => setFitType('all')}>
                  <X size={10} />
                </button>
              </span>
            )}
            {selectedSizes.map(s => (
              <span
                key={s}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                style={{
                  background: 'rgba(142,33,30,0.15)',
                  border: '1px solid rgba(142,33,30,0.3)',
                  color: '#e88',
                  fontFamily: 'Inter',
                }}
              >
                Talla {s}
                <button onClick={() => toggleSize(s)}>
                  <X size={10} />
                </button>
              </span>
            ))}
          </motion.div>
        )}

        {/* Products grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${gender}-${fitType}-${sort}-${selectedSizes.join(',')}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '2rem',
                    color: '#333',
                    letterSpacing: '0.1em',
                  }}
                >
                  No hay productos
                </p>
                <p className="mt-2 text-sm" style={{ color: '#555', fontFamily: 'Inter' }}>
                  Intenta con otros filtros
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 text-sm uppercase tracking-wider"
                  style={{
                    color: '#8e211e',
                    border: '1px solid #8e211e',
                    fontFamily: 'Inter',
                  }}
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
