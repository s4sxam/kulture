import { TimelineEvent } from '../components/ScrollTimeline';
import { TeamMember } from '../components/TeamCarousel';
import { Category } from '../types';

export const HISTORY_EVENTS: TimelineEvent[] =[
  { year: '2018', title: 'The Seed is Planted', description: 'Two friends, a tiny rented kitchen, and an obsession with single-origin beans. Kulture begins as a weekend pop-up in South Kolkata.' },
  { year: '2019', title: 'Our First Home', description: 'We open our doors on Ballygunge Place — a 400 sq ft café with 8 seats, exposed brick walls, and a hand-built espresso bar.' },
  { year: '2020', title: 'The Sober Bar is Born', description: 'During lockdown we reimagined the cocktail experience. Sana Ray joins the team and launches our zero-proof botanical menu — a Kolkata first.' },
  { year: '2021', title: 'Continental Kitchen Opens', description: 'Chef David brings his European training to Kulture. Our kitchen expands, and the truffle mushroom crostini becomes our signature dish overnight.' },
  { year: '2023', title: 'Recognition & Growth', description: 'Named "Best Specialty Café in Eastern India" by Condé Nast Traveller. We expand to a second floor, doubling capacity while keeping our soul intact.' },
  { year: '2026', title: 'Still Brewing', description: "Today, Kulture is a community — of farmers, roasters, artists, and regulars. Every cup tells a story. We're just getting started." },
];

export const TEAM_MEMBERS: TeamMember[] =[
  { id: '1', name: 'Arjun Mehta', role: 'Head Roaster', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400', bio: 'With 12 years of experience in specialty coffee, Arjun ensures every bean at Kulture hits its flavor peak.' },
  { id: '2', name: 'Sana Ray', role: 'Lead Mixologist', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400', bio: 'The architect behind our Sober Bar. Sana blends botanicals and science to create zero-proof masterpieces.' },
  { id: '3', name: 'Chef David', role: 'Executive Chef', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400', bio: 'David brings a continental touch to our kitchen, focusing on artisanal sourdough and truffle infusions.' },
];

export const GALLERY_IMAGES =[
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600',
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600',
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600',
  'https://images.unsplash.com/photo-1516743619420-154b70a65fea?q=80&w=600',
  'https://images.unsplash.com/photo-1533422902779-aff35862e462?q=80&w=600',
  'https://images.unsplash.com/photo-1572286258217-215cf8e2e11d?q=80&w=600',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  'Espresso Bar':      'border-amber-gold/50',
  'Manual Brews':      'border-emerald-600/50',
  'Sober Bar':         'border-purple-500/50',
  'Continental Bites': 'border-red-600/50',
  'Desserts':          'border-pink-500/50',
};

export const CATEGORY_BADGE: Record<Category, string> = {
  'Espresso Bar':      'bg-amber-gold/10 text-amber-gold',
  'Manual Brews':      'bg-emerald-900/40 text-emerald-400',
  'Sober Bar':         'bg-purple-900/40 text-purple-400',
  'Continental Bites': 'bg-red-900/40 text-red-400',
  'Desserts':          'bg-pink-900/40 text-pink-400',
};