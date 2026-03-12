// src/data/content.ts
import { TimelineEvent } from '../components/ScrollTimeline';
import { TeamMember } from '../components/TeamCarousel';
import { Category } from '../types';

export const HISTORY_EVENTS: TimelineEvent[] = [
  { year: '2018', title: 'The Seed is Planted', description: 'Jonaki begins as a weekend pop-up in Krishnanagar, born from an obsession with single-origin beans.' },
  { year: '2020', title: 'Our First Home', description: 'We open our doors to the heart of Krishnanagar — a hand-built espresso bar with soul.' },
  { year: '2022', title: 'The Sober Bar', description: 'Reimagining the ritual. Jonaki launches Krishnanagar’s first zero-proof botanical menu.' },
  { year: '2026', title: 'Still Glowing', description: "Today, Jonaki is a community. Like the firefly, we aim to be a light in the local culinary scene." },
];

export const TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Arjun Mehta', role: 'Head Roaster', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400', bio: 'Ensuring every bean at Jonaki hits its flavor peak.' },
  { id: '2', name: 'Sana Ray', role: 'Lead Mixologist', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400', bio: 'The architect behind our Sober Bar masterpieces.' },
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600',
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600',
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600',
  'https://images.unsplash.com/photo-1516743619420-154b70a65fea?q=80&w=600',
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