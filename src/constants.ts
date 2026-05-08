import { 
  Home, 
  Search, 
  Quote, 
  LayoutDashboard, 
  BookOpen,
  Compass,
  Zap,
  Leaf,
  Users,
  ShoppingBag,
  PlayCircle,
  Headphones,
  CircleUser,
  TrendingUp
} from 'lucide-react';

export const ZEN_COLORS = {
  forest: '#1B3022',
  slate: '#4E5D5C',
  offwhite: '#FDFDFB',
  clay: '#EAE3D9'
};

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'nomad-shop', label: 'Essentials', icon: ShoppingBag, path: '/shop' },
  { id: 'meditate', label: 'Meditate', icon: Headphones, path: '/meditate' },
  { id: 'community', label: 'Movement', icon: Users, path: '/community' },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
];

export const CATEGORIES = [
  { id: 'wisdom', label: 'Daily Wisdom', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'news', label: 'Global News', icon: Compass, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'mindset', label: 'Mindset', icon: Leaf, color: 'text-forest-600', bg: 'bg-green-50' },
  { id: 'vlogs', label: 'Nomad Vlogs', icon: PlayCircle, color: 'text-slate-600', bg: 'bg-slate-50' },
];

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  content: string;
  featured?: boolean;
}

export interface NomadProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  affiliateUrl: string;
  description: string;
}

export const NOMAD_ESSENTIALS: NomadProduct[] = [
  {
    id: 'p1',
    title: 'Heritage Canvas Backpack',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    affiliateUrl: '#',
    description: 'Minimalist carry for the modern explorer.'
  },
  {
    id: 'p2',
    title: 'Zen Sound Cancellation Pods',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    affiliateUrl: '#',
    description: 'Silence the chaos, find your rhythm.'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Art of Digital Minimalism',
    excerpt: 'How to reclaim your focus in a hyper-connected world without losing touch.',
    category: 'Daily Wisdom',
    author: 'Deepak Kumar Gupta',
    date: 'May 8, 2026',
    featured: true,
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
    content: 'Long form content about minimalism...'
  },
  {
    id: '2',
    title: 'Top 10 Zen Stays for Nomads in India',
    excerpt: 'Discover offbeat locations that promote productivity and peace.',
    category: 'Global News',
    author: 'ZenNomad Team',
    date: 'May 7, 2026',
    featured: true,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
    content: 'Detailed listicle of locations...'
  }
];
