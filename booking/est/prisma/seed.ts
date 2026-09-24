import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding…");

  // ---- Users ----
  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const ownerPassword = await bcrypt.hash("Owner123!", 10);
  const touristPassword = await bcrypt.hash("Tourist123!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@eastsl.com" },
    update: {},
    create: { name: "Site Admin", email: "admin@eastsl.com", passwordHash: adminPassword, role: "ADMIN" },
  });

  const owner = await prisma.user.upsert({
    where: { email: "owner@eastsl.com" },
    update: {},
    create: { name: "Nimal Perera", email: "owner@eastsl.com", passwordHash: ownerPassword, role: "BUSINESS_OWNER", phone: "+94 77 123 4567" },
  });

  await prisma.user.upsert({
    where: { email: "tourist@eastsl.com" },
    update: {},
    create: { name: "Jane Traveller", email: "tourist@eastsl.com", passwordHash: touristPassword, role: "TOURIST" },
  });

  // ---- Business listing for the demo owner ----
  const listing = await prisma.businessListing.upsert({
    where: { ownerId: owner.id },
    update: {},
    create: {
      ownerId: owner.id,
      businessName: "Trinco Bay Hospitality",
      businessType: "HOTEL",
      contactPhone: "+94 77 123 4567",
      status: "APPROVED",
      subscription: { create: { plan: "BASIC", status: "ACTIVE" } },
    },
  });

  // ---- Destinations ----
  const trinco = await prisma.destination.upsert({
    where: { slug: "trincomalee" },
    update: {},
    create: {
      name: "Trincomalee",
      slug: "trincomalee",
      region: "Trincomalee",
      summary: "A natural harbour city with whale watching, war-era cliffs and turquoise bays.",
      description:
        "Trincomalee sits on one of the world's finest natural harbours. Beyond Nilaveli's pale sand, the city holds Koneswaram temple perched on Swami Rock, and from April to September the waters offshore are one of the most reliable places on earth to see blue whales and sperm whales.",
      highlights: ["Koneswaram Temple", "Whale & dolphin watching", "Pigeon Island snorkelling", "Nilaveli Beach"],
      coverImageUrl: "https://images.unsplash.com/photo-1590123047847-2b3e1de1e1b0",
      images: [],
      latitude: 8.5874,
      longitude: 81.2152,
    },
  });

  const batti = await prisma.destination.upsert({
    where: { slug: "batticaloa" },
    update: {},
    create: {
      name: "Batticaloa",
      slug: "batticaloa",
      region: "Batticaloa",
      summary: "A lagoon town famous for its 'singing fish' and quiet Dutch-era fort.",
      description:
        "Batticaloa is built around a wide, shallow lagoon crossed by causeways and dotted with tiny islands. It moves slower than the rest of the coast, with a 17th-century Dutch fort, mangrove boat trips, and some of the least-visited beaches in the country.",
      highlights: ["Batticaloa Lagoon boat trips", "Dutch Fort", "Kallady Bridge", "Pasikuda Beach nearby"],
      coverImageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62",
      images: [],
      latitude: 7.7167,
      longitude: 81.7,
    },
  });

  const arugam = await prisma.destination.upsert({
    where: { slug: "arugam-bay" },
    update: {},
    create: {
      name: "Arugam Bay",
      slug: "arugam-bay",
      region: "Ampara",
      summary: "Sri Lanka's best-known surf town, backed by lagoons and elephant country.", 
      description:
        "Arugam Bay is a single curving point break that put the east coast on the surfing map, but the wider bay backs onto Kumana National Park and its lagoons, home to elephants, crocodiles and huge flocks of migratory birds. The season runs roughly May to September.",
      highlights: ["Main Point surf break", "Kumana National Park safari", "Whiskey Point", "Pottuvil Lagoon"],
      coverImageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f",
      images: [],
      latitude: 6.8404,
      longitude: 81.836,
    },
  });

  // ---- Hotel ----
  await prisma.hotel.upsert({
    where: { slug: "trinco-bay-resort" },
    update: {},
    create: {
      name: "Trinco Bay Resort",
      slug: "trinco-bay-resort",
      description: "Beachfront rooms a short walk from Nilaveli, with a dive centre on site.",
      address: "Nilaveli Beach Road, Trincomalee",
      pricePerNight: 85,
      starRating: 4,
      amenities: ["Pool", "Free WiFi", "Dive centre", "Breakfast included"],
      coverImageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      images: [],
      status: "APPROVED",
      destinationId: trinco.id,
      businessListingId: listing.id,
      rooms: {
        create: [
          { type: "Garden Double", price: 85, capacity: 2, images: [] },
          { type: "Sea View Suite", price: 140, capacity: 3, images: [] },
        ],
      },
    },
  });

  // ---- Restaurant ----
  await prisma.restaurant.upsert({
    where: { slug: "lagoon-view-kitchen" },
    update: {},
    create: {
      name: "Lagoon View Kitchen",
      slug: "lagoon-view-kitchen",
      description: "Fresh lagoon crab and home-style Batticaloa cooking on the water's edge.",
      cuisineType: "Sri Lankan seafood",
      priceRange: "$$",
      address: "Lake Road, Batticaloa",
      coverImageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e",
      images: [],
      status: "APPROVED",
      destinationId: batti.id,
    },
  });

  // ---- Activity ----
  await prisma.activity.upsert({
    where: { slug: "arugam-bay-surf-lesson" },
    update: {},
    create: {
      name: "Arugam Bay Surf Lesson",
      slug: "arugam-bay-surf-lesson",
      description: "Half-day beginner surf lesson at Baby Point with a local instructor, board included.",
      category: "Surfing",
      price: 25,
      durationHours: 3,
      coverImageUrl: "https://images.unsplash.com/photo-1502933691298-84fc14542831",
      images: [],
      status: "APPROVED",
      destinationId: arugam.id,
    },
  });

  // ---- Tour package ----
  await prisma.tourPackage.upsert({
    where: { slug: "east-coast-explorer-5-day" },
    update: {},
    create: {
      name: "East Coast Explorer — 5 Days",
      slug: "east-coast-explorer-5-day",
      description: "Trincomalee whale watching, Batticaloa lagoon, and three nights of surf in Arugam Bay.",
      durationDays: 5,
      price: 480,
      includedItems: ["Private driver", "4 nights accommodation", "Whale watching trip", "Surf lesson"],
      coverImageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206",
      images: [],
      status: "APPROVED",
    },
  });

  // ---- Event ----
  await prisma.event.create({
    data: {
      name: "Kathirgamam Esala Festival",
      slug: `esala-festival-${Date.now()}`,
      description: "Annual procession and fire-walking festival with roots across the eastern province.",
      startDate: new Date(new Date().getFullYear(), 7, 1),
      endDate: new Date(new Date().getFullYear(), 7, 10),
      coverImageUrl: "https://images.unsplash.com/photo-1604608672516-f1b9be6c5c45",
      destinationId: trinco.id,
    },
  });

  // ---- Travel guide article ----
  await prisma.travelGuideArticle.upsert({
    where: { slug: "best-time-to-visit-the-east-coast" },
    update: {},
    create: {
      title: "Best time to visit the east coast",
      slug: "best-time-to-visit-the-east-coast",
      category: "Planning",
      content:
        "The east coast runs on the opposite monsoon cycle to the south and west: April to September is dry and calm here, which is exactly when the rest of the island gets its rain. Arugam Bay's surf season peaks June–August.",
      coverImageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    },
  });

  console.log("Seed complete.");
  console.log("Login as admin@eastsl.com / Admin123!");
  console.log("Login as owner@eastsl.com / Owner123!");
  console.log("Login as tourist@eastsl.com / Tourist123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
