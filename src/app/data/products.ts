export interface Product {
  id: string;
  name: string;
  category: 'women' | 'men';
  type: 'skinny' | 'slim' | 'regular' | 'wide' | 'boyfriend' | 'mom' | 'flare' | 'baggy';
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  description: string;
  stock: number;
  isNew?: boolean;
  isSale?: boolean;
  color: string;
  material: string;
  featured?: boolean;
}

const IMG = {
  skinnyW: 'https://images.unsplash.com/photo-1547806605-379c96c20ffb?w=700&q=80',
  slimM: 'https://images.unsplash.com/photo-1605518215584-5ba74df5dfd8?w=700&q=80',
  wideW: 'https://images.unsplash.com/photo-1654215317174-337ac41f6df6?w=700&q=80',
  texture: 'https://images.unsplash.com/photo-1673173044976-1f49df814171?w=700&q=80',
  womanStudio: 'https://images.unsplash.com/photo-1762164130276-021d7c91cd89?w=700&q=80',
  manDark: 'https://images.unsplash.com/photo-1759553126523-8e0efd65093d?w=700&q=80',
  womanStreet: 'https://images.unsplash.com/photo-1750857740128-af60030f5057?w=700&q=80',
  editorial: 'https://images.unsplash.com/photo-1771012266130-435928e57460?w=700&q=80',
  boyfriendW: 'https://images.unsplash.com/photo-1561578508-039273883db4?w=700&q=80',
  rippedM: 'https://images.unsplash.com/photo-1531945086322-64e2ffae14a6?w=700&q=80',
  womanHero: 'https://images.unsplash.com/photo-1601975586886-da4d805c336f?w=700&q=80',
  manStreet: 'https://images.unsplash.com/photo-1764937572078-5e2f75649219?w=700&q=80',
};

export const products: Product[] = [
  // ——— MUJERES ———
  {
    id: 'w-001',
    name: 'Skinny Classic Noir',
    category: 'women',
    type: 'skinny',
    price: 89900,
    images: [IMG.skinnyW, IMG.womanHero, IMG.womanStudio],
    sizes: ['24', '25', '26', '27', '28', '29', '30'],
    description:
      'Jean skinny de corte clásico que realza tu silueta. Confeccionado en denim premium con elastano para máximo confort y movilidad. Un básico indispensable de tu guardarropa.',
    stock: 8,
    isNew: true,
    color: 'Azul Oscuro',
    material: '98% Algodón, 2% Elastano',
    featured: true,
  },
  {
    id: 'w-002',
    name: 'Wide Leg Luxe',
    category: 'women',
    type: 'wide',
    price: 109900,
    originalPrice: 129900,
    images: [IMG.wideW, IMG.editorial, IMG.womanStreet],
    sizes: ['24', '25', '26', '27', '28', '29', '30', '31'],
    description:
      'La tendencia del momento. Jean ancho con caída perfecta y tiro alto que estiliza la figura. Fabricado con denim de alta densidad para una caída impecable.',
    stock: 5,
    isSale: true,
    color: 'Azul Medio',
    material: '100% Algodón',
    featured: true,
  },
  {
    id: 'w-003',
    name: 'Boyfriend Urban',
    category: 'women',
    type: 'boyfriend',
    price: 94900,
    images: [IMG.boyfriendW, IMG.womanStreet, IMG.editorial],
    sizes: ['24', '25', '26', '27', '28', '29', '30'],
    description:
      'Corte relajado con estética urbana. Jean boyfriend de inspiración masculina con detalle de desgastes sutiles. Ideal para looks casuales con actitud.',
    stock: 12,
    color: 'Light Wash',
    material: '99% Algodón, 1% Elastano',
    featured: true,
  },
  {
    id: 'w-004',
    name: 'Mom Jean Vintage',
    category: 'women',
    type: 'mom',
    price: 99900,
    images: [IMG.womanStudio, IMG.womanHero, IMG.boyfriendW],
    sizes: ['24', '25', '26', '27', '28', '29', '30', '31'],
    description:
      'El clásico atemporal reinventado. Tiro alto y corte cómodo que favorece toda silueta. Acabado vintage con lavado especial para un look auténtico.',
    stock: 6,
    isNew: true,
    color: 'Vintage Indigo',
    material: '100% Algodón',
    featured: false,
  },
  {
    id: 'w-005',
    name: 'Slim Fit Elegance',
    category: 'women',
    type: 'slim',
    price: 84900,
    images: [IMG.womanStreet, IMG.skinnyW, IMG.womanStudio],
    sizes: ['24', '25', '26', '27', '28', '29', '30'],
    description:
      'Jean slim que combina el ajuste perfecto con la comodidad del día a día. Corte moderno que se adapta a toda figura y ocasión.',
    stock: 15,
    color: 'Dark Indigo',
    material: '97% Algodón, 3% Elastano',
    featured: false,
  },
  {
    id: 'w-006',
    name: 'Flare Statement',
    category: 'women',
    type: 'flare',
    price: 104900,
    originalPrice: 119900,
    images: [IMG.editorial, IMG.wideW, IMG.womanStreet],
    sizes: ['24', '25', '26', '27', '28', '29', '30'],
    description:
      'El flare de los 70s vuelve con fuerza. Corte acampanado desde la rodilla con tiro alto que alarga y estiliza las piernas. Perfecto para looks fashion.',
    stock: 4,
    isSale: true,
    color: 'Black Rinse',
    material: '98% Algodón, 2% Elastano',
    featured: false,
  },
  // ——— HOMBRES ———
  {
    id: 'm-001',
    name: 'Slim Premium Dark',
    category: 'men',
    type: 'slim',
    price: 84900,
    images: [IMG.slimM, IMG.manDark, IMG.manStreet],
    sizes: ['28', '29', '30', '31', '32', '33', '34', '36'],
    description:
      'Jean slim de corte moderno y silueta ajustada. El favorito del hombre urbano. Denim de alta calidad con el confort que necesitas para el día a día.',
    stock: 10,
    isNew: true,
    color: 'Dark Rinse',
    material: '98% Algodón, 2% Elastano',
    featured: true,
  },
  {
    id: 'm-002',
    name: 'Regular Classic',
    category: 'men',
    type: 'regular',
    price: 79900,
    images: [IMG.manDark, IMG.slimM, IMG.texture],
    sizes: ['28', '30', '32', '33', '34', '36', '38'],
    description:
      'Corte regular atemporal con ajuste cómodo en cadera y muslo. El jean que nunca falla. Versatil, resistente y con la calidad Amatt Denim.',
    stock: 20,
    color: 'Medium Wash',
    material: '100% Algodón',
    featured: true,
  },
  {
    id: 'm-003',
    name: 'Skinny Urban Edge',
    category: 'men',
    type: 'skinny',
    price: 89900,
    images: [IMG.manStreet, IMG.rippedM, IMG.manDark],
    sizes: ['28', '29', '30', '31', '32', '33', '34'],
    description:
      'Jean skinny de alto estiramiento para el hombre que vive la ciudad. Silueta ceñida con máxima libertad de movimiento. Estilo urbano en estado puro.',
    stock: 7,
    isNew: true,
    color: 'Black',
    material: '95% Algodón, 5% Elastano',
    featured: true,
  },
  {
    id: 'm-004',
    name: 'Wide Baggy Street',
    category: 'men',
    type: 'baggy',
    price: 99900,
    originalPrice: 114900,
    images: [IMG.rippedM, IMG.texture, IMG.manStreet],
    sizes: ['28', '30', '32', '34', '36', '38'],
    description:
      'El baggy que domina las calles. Corte oversized con caída natural y estética streetwear. Confeccionado en denim grueso de alta durabilidad.',
    stock: 9,
    isSale: true,
    color: 'Washed Blue',
    material: '100% Algodón',
    featured: false,
  },
  {
    id: 'm-005',
    name: 'Straight Classic',
    category: 'men',
    type: 'regular',
    price: 84900,
    images: [IMG.texture, IMG.slimM, IMG.manDark],
    sizes: ['28', '30', '32', '33', '34', '36', '38'],
    description:
      'Jean recto con ajuste perfecto desde la cintura hasta el tobillo. La evolución del clásico. Diseño limpio con acabados de alta costura denim.',
    stock: 14,
    color: 'Stone Wash',
    material: '100% Algodón',
    featured: false,
  },
  {
    id: 'm-006',
    name: 'Ripped Urban Fighter',
    category: 'men',
    type: 'slim',
    price: 94900,
    images: [IMG.rippedM, IMG.manStreet, IMG.manDark],
    sizes: ['28', '29', '30', '31', '32', '33', '34'],
    description:
      'Jean slim con rotos estratégicamente ubicados para un look agresivo y fashion. Cada desgaste es artesanal. La actitud urbana en su máxima expresión.',
    stock: 5,
    color: 'Light Indigo',
    material: '98% Algodón, 2% Elastano',
    featured: false,
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find(p => p.id === id);

export const getFeaturedProducts = (): Product[] =>
  products.filter(p => p.featured);

export const getProductsByCategory = (category: 'women' | 'men'): Product[] =>
  products.filter(p => p.category === category);
