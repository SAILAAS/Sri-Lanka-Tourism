# East Sri Lanka Tourism

Full-stack scaffold: **Next.js 14 (App Router) + TypeScript + Prisma + PostgreSQL + NextAuth + Tailwind**.

## 1. Setup

```bash
npm installdir
cp .env.example .env      # then edit DATABASE_URL and NEXTAUTH_SECRET
npx prisma migrate dev --name init
npm run seed               # loads sample destinations, hotel, tour, users
npm run dev
```

Generate a `NEXTAUTH_SECRET` with `openssl rand -base64 32`.

Seeded logins (see `prisma/seed.ts`):
| Role | Email | Password |
|---|---|---|
| Admin | admin@eastsl.com | Admin123! |
| Business owner | owner@eastsl.com | Owner123! |
| Tourist | tourist@eastsl.com | Tourist123! |

## 2. What's fully built

- **Data model** — `prisma/schema.prisma` covers every entity in the sitemap: Users (roles), Destinations,
  Hotels/Rooms, Restaurants, Activities, Tour Packages, Events, Travel Guide articles, Bookings, Reviews,
  Business Listings, Subscriptions.
- **Auth** — email/password via NextAuth Credentials, JWT session carries `role`. `src/middleware.ts` blocks
  `/admin/*` to non-admins and `/business/*` to non-business-owners (except `/business/register`), and
  `/profile`, `/bookings` to signed-out users.
- **Pages built end-to-end**: Home, Destinations (list + detail), Login, Register, Admin Dashboard,
  Business registration + Business Dashboard.
- **API routes with real Prisma reads/writes** (not mocks): destinations, hotels, restaurants, activities,
  tours, events, guide, bookings, reviews, business listings, auth/register.

## 3. What's stubbed, and how to extend it

Every other page in the sitemap renders real data from the database and follows the same visual style, but
is intentionally light so you can build on it rather than fight generated code:

- **Admin** `users / hotels / restaurants / activities / tours / bookings / reviews` — read-only tables.
  `admin/destinations/page.tsx` is the fullest example (list + delete via `fetch`); copy that pattern and
  add `PUT`/`POST` forms once you know what fields each admin should edit.
- **Business owner** `listings / bookings / subscription` — read the owner's own `BusinessListing`. Add
  forms that POST to new scoped routes like `/api/business/hotels` (mirror `/api/destinations/route.ts`).
- **Public** `Hotel/Activity detail`, `Restaurants`, `Tours`, `Travel Guide`, `Events`, `Search`,
  `Contact`, `About`, `Profile`, `My Bookings` — render live data; booking/review buttons are marked
  `// TODO` with the exact `fetch` call to wire up (`POST /api/bookings`, `POST /api/reviews`).

## 4. Project structure

```
prisma/schema.prisma        full data model
prisma/seed.ts               sample data
src/lib/prisma.ts            Prisma client singleton
src/lib/auth.ts              NextAuth config
src/middleware.ts            role-based route protection
src/app/api/**               REST-style route handlers (App Router route.ts files)
src/app/**                   pages, grouped to match the sitemap
src/app/admin/**             admin panel (role-guarded)
src/app/business/**          business owner panel (role-guarded)
src/components/              Navbar, Footer, session Provider
```

## 5. Design system

Palette (`tailwind.config.ts`): deep lagoon teal, warm sand, clay/rust accent, ocean blue — built around the
Trincomalee/Batticaloa/Arugam Bay coastline rather than a generic travel-site template. Headings use
Instrument Serif, body text uses Inter. Listing cards use a "ticket stub" motif (dashed tear line) via the
`.stub-card` class in `globals.css`.

## 6. Suggested next steps

1. Add image upload (S3 or Cloudinary) instead of the `coverImageUrl` string fields.
2. Add admin approve/reject actions for `BusinessListing` (status is already in the schema).
3. Wire a payment provider (Stripe) into `/business/subscription` and the booking flow.
4. Add pagination to the list API routes once data volume grows past a page or two.
5. Write integration tests for the auth and booking routes before going to production.
