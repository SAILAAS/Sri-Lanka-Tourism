import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getStats() {
  try {
    const [users, destinations, hotels, bookings, pendingListings] = await Promise.all([
      prisma.user.count(),
      prisma.destination.count(),
      prisma.hotel.count(),
      prisma.booking.count(),
      prisma.businessListing.count({ where: { status: "PENDING" } }),
    ]);
    return { users, destinations, hotels, bookings, pendingListings };
  } catch {
    return { users: 0, destinations: 0, hotels: 0, bookings: 0, pendingListings: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Users", value: stats.users, href: "/admin/users" },
    { label: "Destinations", value: stats.destinations, href: "/admin/destinations" },
    { label: "Hotels", value: stats.hotels, href: "/admin/hotels" },
    { label: "Bookings", value: stats.bookings, href: "/admin/bookings" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-lagoon mb-1">Dashboard</h1>
      <p className="text-ink/60 mb-8">Overview of the platform.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="border border-ink/10 rounded-sm p-5 hover:border-lagoon/40 transition-colors">
            <p className="text-3xl font-display text-lagoon">{c.value}</p>
            <p className="text-sm text-ink/60 mt-1">{c.label}</p>
          </Link>
        ))}
      </div>

      {stats.pendingListings > 0 && (
        <div className="border border-clay/30 bg-clay/5 rounded-sm p-5 flex items-center justify-between">
          <p className="text-sm text-ink/80">
            <span className="text-clay font-medium">{stats.pendingListings} business listing(s)</span> are waiting for approval.
          </p>
          <Link href="/admin/users" className="text-clay text-sm hover:underline">Review →</Link>
        </div>
      )}

      <div className="mt-10 text-sm text-ink/50 border-t border-ink/10 pt-6">
        This dashboard is the pattern for the rest of the admin section — <code>/admin/users</code>,{" "}
        <code>/admin/hotels</code>, <code>/admin/bookings</code> etc. follow the same layout: a data table
        reading from the matching <code>/api/*</code> route, with row actions for approve / edit / delete.
      </div>
    </div>
  );
}
