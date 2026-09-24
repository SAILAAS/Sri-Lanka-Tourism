import { prisma } from "@/lib/prisma";

async function getBookings() {
  try {
    return await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { user: true, hotel: true, restaurant: true, activity: true, tour: true },
    });
  } catch {
    return [];
  }
}

function itemName(b: Awaited<ReturnType<typeof getBookings>>[number]) {
  return b.hotel?.name || b.restaurant?.name || b.activity?.name || b.tour?.name || "—";
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <div>
      <h1 className="font-display text-3xl text-lagoon mb-6">Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-ink/50 text-sm">No bookings yet.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-ink/50 border-b border-ink/10">
              <th className="py-2 font-normal">Guest</th>
              <th className="py-2 font-normal">Type</th>
              <th className="py-2 font-normal">Item</th>
              <th className="py-2 font-normal">Total</th>
              <th className="py-2 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-ink/5">
                <td className="py-3">{b.user.name}</td>
                <td className="py-3 text-ink/60">{b.type}</td>
                <td className="py-3 text-ink/60">{itemName(b)}</td>
                <td className="py-3">${b.totalPrice}</td>
                <td className="py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-sand-dark/50">{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
