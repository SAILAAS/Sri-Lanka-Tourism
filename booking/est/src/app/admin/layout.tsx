import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/destinations", label: "Destinations" },
  { href: "/admin/hotels", label: "Hotels" },
  { href: "/admin/restaurants", label: "Restaurants" },
  { href: "/admin/activities", label: "Activities" },
  { href: "/admin/tours", label: "Tours" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/reviews", label: "Reviews" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Middleware already blocks non-admins from reaching this layout;
  // this second check keeps the page safe if it's ever rendered another way.
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 grid lg:grid-cols-[220px_1fr] gap-10">
      <aside>
        <p className="text-xs text-ink/40 mb-3">Admin</p>
        <nav className="flex lg:flex-col gap-1 flex-wrap">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-sm text-sm text-ink/75 hover:bg-sand-dark/40 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}
