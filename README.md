# Smart Tourism Sri Lanka — Multilingual Travel Discovery

An academic MVP tourism discovery platform and enquiry management system for Sri Lanka, built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase / Local JSON dual-store**.

---

## Complete Pages & Navigation

The navigation bar dynamically auto-hides when scrolling down and reappears when scrolling up, providing an immersive viewing experience while retaining quick access:

1. **[Home](/)** ([`app/page.tsx`](file:///c:/Users/User/User/Desktop/Smart Tourism Website/app/page.tsx)):
   - Hero section with authentic photography and action CTAs.
   - Featured destination cards with real-time currency conversion.
   - "Why Visit Sri Lanka" cultural & natural pillars.
   - Interactive Sri Lanka Google Map showcasing main landmarks.
   - Client-validated tour enquiry form.
2. **[Packages](/packages)** ([`app/packages/page.tsx`](file:///c:/Users/User/User/Desktop/Smart Tourism Website/app/packages/page.tsx)):
   - Handcrafted multi-day tour itineraries (Cultural Heritage & Hills, All-Island Grand Tour, Southern Coast & Whales, Ancient Kingdoms).
   - Inclusions, durations, highlights, and dynamic price conversion in active currency.
3. **[Trip Planner](/trip-planner)** ([`app/trip-planner/page.tsx`](file:///c:/Users/User/User/Desktop/Smart Tourism Website/app/trip-planner/page.tsx)):
   - 4-step interactive custom journey builder (Duration, Style, Multi-select Destinations, Group & Accommodation).
   - Instant dynamic budget estimate and 1-click custom inquiry submission directly to the database.
4. **[Destinations](/destinations)** ([`app/destinations/page.tsx`](file:///c:/Users/User/User/Desktop/Smart Tourism Website/app/destinations/page.tsx)):
   - Complete destination overview with category filtering (`Heritage & Culture`, `Nature & Adventure`, `History & Coastal`, `Beach & Marine`).
   - Detailed destination guides at `/destinations/[slug]` (Sigiriya, Ella, Galle Fort, Mirissa).
5. **[About](/about)** ([`app/about/page.tsx`](file:///c:/Users/User/User/Desktop/Smart Tourism Website/app/about/page.tsx)):
   - History of Ceylon, 8 UNESCO World Heritage Sites, Ceylon tea heritage, and ethical tourism commitments.
6. **[Reviews](/reviews)** ([`app/reviews/page.tsx`](file:///c:/Users/User/User/Desktop/Smart Tourism Website/app/reviews/page.tsx)):
   - Verified traveler stories from the UK, Japan, France, China, and Australia with 4.9/5 overall rating breakdown.
   - Interactive review submission form.
7. **[Contact](/contact)** ([`app/contact/page.tsx`](file:///c:/Users/User/User/Desktop/Smart Tourism Website/app/contact/page.tsx)):
   - **Interactive Live Google Map:** Features 8 key Sri Lankan places (Sigiriya, Ella, Galle Fort, Mirissa, Kandy, Nuwara Eliya, Yala, Colombo) with one-click pinpointing and geographic coordinates.
   - Colombo Central Head Office contact details, telephone, email, WhatsApp, and direct inquiry form.
8. **[Admin Dashboard](/admin)** ([`app/admin/page.tsx`](file:///c:/Users/User/User/Desktop/Smart Tourism Website/app/admin/page.tsx)):
   - Staff login with Supabase Auth or demo credentials.
   - Real-time customer enquiry inspection (name, email, destination, date, message).
   - Status management (`New`, `Contacted`, `Closed`).
   - JSON file store (`data/enquiries.json`) with Supabase sync and 1-click JSON export.

---

## Design System
- **Natural Ceylon Palette:** Deep emerald green (`#1b4332`), warm sand, ivory linen, and coastal teal.
- **Auto-Hiding Navbar:** Automatically slides out of view on scroll down (`-translate-y-full`) and slides back down on scroll up (`translate-y-0`).
- **Real Photography:** Authentic high-resolution imagery for all landmarks.
- **Pure Traditional Design:** Clean typography, classic layouts, no AI neon glow or futuristic effects.
- **Multilingual UI:** 5 languages (`en`, `ta`, `si`, `zh`, `ja`).
- **Currency Conversion:** 4 currencies (`LKR`, `USD`, `GBP`, `JPY`).

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```
Open **`http://localhost:3000`** in your browser.

### Admin Login
Navigate to `http://localhost:3000/admin`:
- **Email:** `admin@smart-tourism.lk`
- **Password:** `CeylonTravel2026!`
*(An auto-fill button is also available on the login screen).*
