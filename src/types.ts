export type Category = 'Espresso Bar' | 'Manual Brews' | 'Sober Bar' | 'Continental Bites' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  isNonVeg?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export const MENU_DATA: MenuItem[] = [
  // Espresso Bar
  { id: 'eb1', name: 'Kulture Signature Flat White', price: 280, description: 'Velvety micro-foam poured over a double shot of our signature blend.', category: 'Espresso Bar' },
  { id: 'eb2', name: 'Spanish Latte', price: 310, description: 'Sweetened condensed milk meets bold espresso for a creamy, balanced treat.', category: 'Espresso Bar' },
  { id: 'eb3', name: 'Dark Belgian Mocha', price: 350, description: 'Rich Belgian chocolate melted into espresso and steamed milk.', category: 'Espresso Bar' },
  { id: 'eb4', name: 'Cortado', price: 220, description: 'Equal parts espresso and warm milk for a powerful yet smooth experience.', category: 'Espresso Bar' },

  // Manual Brews
  { id: 'mb1', name: 'V60 Pourover', price: 300, description: 'Clean, tea-like clarity highlighting the unique notes of our single-origin beans.', category: 'Manual Brews' },
  { id: 'mb2', name: 'Aeropress', price: 280, description: 'A full-bodied, versatile brew that brings out the richness of the coffee.', category: 'Manual Brews' },
  { id: 'mb3', name: '24-Hour Cold Brew', price: 250, description: 'Steeped for 24 hours for a low-acid, naturally sweet, and refreshing kick.', category: 'Manual Brews' },

  // Sober Bar
  { id: 'sb1', name: 'Zero-Proof G&T', price: 350, description: 'Botanical non-alcoholic spirit with premium tonic and dehydrated citrus.', category: 'Sober Bar' },
  { id: 'sb2', name: 'Passionfruit & Basil Smash', price: 320, description: 'Fresh basil muddled with passionfruit puree and sparkling water.', category: 'Sober Bar' },
  { id: 'sb3', name: 'Espresso Martini (Mocktail)', price: 380, description: 'A sophisticated blend of cold brew, vanilla, and a hint of hazelnut.', category: 'Sober Bar' },

  // Continental Bites
  { id: 'cb1', name: 'Truffle Mushroom Crostini', price: 380, description: 'Wild mushrooms sautéed in truffle oil on toasted sourdough.', category: 'Continental Bites' },
  { id: 'cb2', name: 'Peri Peri Chicken Tenders', price: 420, description: 'Crispy chicken strips tossed in our house-made spicy peri-peri seasoning.', category: 'Continental Bites', isNonVeg: true },
  { id: 'cb3', name: 'Avocado Sourdough Toast', price: 450, description: 'Smashed avocado, cherry tomatoes, and feta on artisanal sourdough.', category: 'Continental Bites' },
  { id: 'cb4', name: 'Classic Margherita Pizza', price: 499, description: 'San Marzano tomatoes, fresh mozzarella, and basil on a thin crust.', category: 'Continental Bites' },

  // Desserts
  { id: 'd1', name: 'Classic Tiramisu', price: 350, description: 'Espresso-soaked ladyfingers layered with rich mascarpone cream.', category: 'Desserts' },
  { id: 'd2', name: 'Basque Burnt Cheesecake', price: 380, description: 'Creamy, crustless cheesecake with a beautifully caramelized top.', category: 'Desserts' },
  { id: 'd3', name: 'Affogato', price: 250, description: 'A double shot of hot espresso poured over a scoop of vanilla bean gelato.', category: 'Desserts' },
];
