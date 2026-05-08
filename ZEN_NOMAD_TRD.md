# ZenNomad: Technical Requirement Document (TRD)

## 1. Project Overview
**Project Name:** ZenNomad — Lifestyle & News Platform
**Core Philosophy:** "Movement without chaos, Ambition without anxiety."
**Founder:** Deepak Kumar Gupta

## 2. UI/UX Strategy
- **Aesthetic:** Minimalist Editorial / Neo-minimalism.
- **Color Palette:**
  - `#1B3022` (Deep Forest Green) - Focus & Grounding.
  - `#4E5D5C` (Slate Gray) - Stability.
  - `#FDFDFB` (Off-White) - Space & Breath.
- **Typography:** Inter (Body), Montserrat (Display/Heading).
- **Interactions:** Smooth, staggered animations using `motion` (Framer Motion). No sharp, jarring jumps.

## 3. Core Features & Architecture

### A. News & Article Engine
- **Categorization:** Daily Wisdom (sacred daily quotes), Global News (nomad trends), Mindset.
- **State Management:** Real-time sync via Cloud Firestore.
- **User Actions:** 'Read Later' queue and 'Bookmark' collections.

### B. Multimedia Integration
- **Video:** Integrated ReactPlayer for tutorials and vlogs. Focus on "sacred routines" and travel guides.
- **Audio:** Podcast/Meditation player with background playback capability (using native-like UI).

### C. Community Hub
- **Profiles:** Firestore-driven user profiles with "Nomad Status" badge.
- **Engagement:** Threaded comments and "Movement" follow system.

### D. Ambition Tracker
- **Visualization:** Neumorphic progress bars tracking focus sessions, meditation streaks, and reading goals.

## 4. Monetization Modules

### A. Ad Integration
- **Placement:** Banner (Footer), Native (In-feed between 3rd and 4th article), Interstitial (Transition between long-read chapters).
- **Targeting:** AdMob / Facebook Audience Network.

### B. Affiliate Marketing (Nomad Essentials)
- **Shop Section:** Curated list of nomad products.
- **CTA:** Direct affiliate link integration via glassmorphism shop cards.

### C. Premium Paywall (ZenNomad Pro)
- **Engine:** RevenueCat logic integration.
- **Tiers:** 
  - Standard (Ads).
  - Pro (Ad-free, Deep-dive Articles).
  - Elite (Private Community Access, 1-on-1 Nomad Coaching).

## 5. Technical Stack (React/Web)
- **Frontend:** React 18, Vite, Tailwind CSS.
- **Styling:** CSS @theme with design variables.
- **Database:** Google Cloud Firestore.
- **Auth:** Firebase Auth (Google & Email).
- **Analytics:** Recharts for Personalized Monetization Dashboards.

---
**Contact:**
Deepak Kumar Gupta | Mirzapur, U.P.
Mobile: 8840778831 | Email: deepak151089@gmail.com
