import type { Product } from '@/schemas';

export const products: Product[] = [
  {
    id: '1',
    name: 'Bolo Rei',
    slug: 'bolo-rei',
    description: 'Massa folhada fina e estaladiça, recheio de doce de ovos.',
    price: 2.20,
    category: 'docaria',
    image: '/bolo-rei.jpg',
    featured: true,
    available: true,
    tags: ['Artesanal', 'Chocolate']
  },
  {
    id: '2',
    name: 'Bolo de Chocolate e Avelãs',
    slug: 'bolo-de-chocolate-e-avelas',
    description: 'Intenso, húmido e com um toque de avelãs torradas.',
    price: 28.00,
    category: 'bolos',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80',
    featured: true,
    available: true,
    tags: ['Artesanal', 'Chocolate']
  },
  {
    id: '3',
    name: 'Biscoitos de Amêndoa e Canela',
    slug: 'biscoitos-de-amendoa',
    description: 'Estaladiços e perfumados, perfeitos para o chá.',
    price: 6.50,
    category: 'biscoitos',
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&q=80',
    featured: false,
    available: true,
    tags: ['Vegan', 'Chá']
  },
  {
    id: '4',
    name: 'Tarte de Chila e Nozes',
    slug: 'tarte-de-chila',
    description: 'Clássica tarte portuguesa com doce de chila e nozes caramelizadas.',
    price: 18.00,
    category: 'especialidades',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80',
    featured: true,
    available: true,
    tags: ['Tradicional']
  },
  {
    id: '5',
    name: 'Chá Preto com Earl Grey',
    slug: 'cha-preto-earl-grey',
    description: 'Blend aromático de chá preto com bergamota.',
    price: 3.50,
    category: 'bebidas',
    image: '/cha.webp',
    featured: false,
    available: true,
    tags: ['Quente', 'Aromático']
  }
];
