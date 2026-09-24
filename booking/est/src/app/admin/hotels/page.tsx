import Link from "next/link";
import { prisma } from "@/lib/prisma";

// TODO: extend with the same create/delete pattern as /admin/destinations.
async function getHotels() {
  try {
    return await prisma.hotel.findMany({ orderBy: { createdAt: "desc" }, include: { destination: true } });
  } catch {
    return [];
  }
}

export default async function AdminHotelsPage() {
  const hotels = await getHotels();
  return (
    <div>
      <h1 className="font-display text-3xl text-lagoon mb-6">Hotels</h1>
      {hotels.length === 0 ? (
        <p className="text-ink/50 text-sm">No hotels yet.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-ink/50 border-b border-ink/10">
              <th className="py-2 font-normal">Name</th>
              <th className="py-2 font-normal">Destination</th>
              <th className="py-2 font-normal">Price/night</th>
              <th className="py-2 font-normal">Status</th>
              <th className="py-2 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((h) => (
              <tr key={h.id} className="border-b border-ink/5">
                <td className="py-3">{h.name}</td>
                <td className="py-3 text-ink/60">{h.destination.name}</td>
                <td className="py-3">${h.pricePerNight}</td>
                <td className="py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-sand-dark/50">{h.status}</span></td>
                <td className="py-3 text-right"><Link href={`/hotels/${h.slug}`} className="text-ocean hover:underline">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
