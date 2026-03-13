# ☕ Kulture — Specialty Café Website

> A modern, animated café website for **Café**.

🔗 **Live Site:** [kulture-ashy.vercel.app](https://kulture-ashy.vercel.app)

---

## ✨ Features

- **Interactive Menu** — Browse 5 categories (Espresso Bar, Manual Brews, Sober Bar, Continental Bites, Desserts) with animated category switching
- **Add to Cart** — Smooth cart drawer with spring animations, quantity controls, and delete support
- **WhatsApp Ordering** — One-tap order submission directly to WhatsApp with full order summary
- **Gallery** — Immersive 3D image ring you can drag and spin
- **Chain Carousel** — Quick-add menu items from the home page
- **Team Section** — Animated team carousel with member bios
- **History Timeline** — Scroll-driven timeline of the café's journey
- **Sparkle Navbar** — Custom animated navigation with sparkle effects
- **Mobile First** — Fully responsive; cart drawer slides up from bottom on mobile, in from the right on desktop
- **Veg / Non-Veg Indicators** — Color-coded dot badges on every menu item

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 6 | Build tool & dev server |
| Tailwind CSS 4 | Styling |
| Motion (Framer) | Animations & transitions |
| GSAP | Advanced scroll animations |
| Lucide React | Icons |
| Vercel | Deployment |

---

##📁 Project Structure
src/
├── components/
│   ├── CartDrawer.tsx            # Slide-up/slide-in cart with WhatsApp checkout
│   ├── MenuPage.tsx              # Tabbed menu with animated item grid
│   ├── HomeView.tsx              # Landing page with hero, stats & feature cards
│   ├── Navbar.tsx                # Top navigation bar
│   ├── SparkleNavbar.tsx         # Animated sparkle nav links
│   ├── HamburgerMenuOverlay.tsx  # Mobile menu overlay
│   ├── TeamCarousel.tsx          # Draggable team member carousel
│   ├── ChainCarousel.tsx         # Quick-add horizontal item carousel
│   ├── ThreeDImageRing.tsx       # 3D spinning image gallery
│   ├── ScrollTimeline.tsx        # Scroll-driven history timeline
│   ├── GalleryView.tsx           # Gallery page
│   ├── Footer.tsx                # Site footer
│   ├── SlidingCards.tsx          # Sliding card animations
│   ├── SlidingLogoMarquee.tsx    # Logo marquee strip
│   ├── ImageTrailEffect.tsx      # Cursor image trail effect
│   └── card.tsx                  # Base card UI component
├── data/
│   └── content.ts                # All site content — team, history, gallery, category styles
├── types.ts                      # TypeScript types & full MENU_DATA
├── App.tsx                       # Root app with routing & cart state
├── main.tsx                      # Entry point
└── index.css                     # Global styles & Tailwind config

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
