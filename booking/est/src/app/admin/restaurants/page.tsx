import { prisma } from "@/lib/prisma";

async function getRestaurants() {
  try {
    return await prisma.restaurant.findMany({ orderBy: { createdAt: "desc" }, include: { destination: true } });
  } catch {
    return [];
  }
}

export default async function AdminRestaurantsPage() {
  const restaurants = await getRestaurants();
  return (
    <div>
      <h1 className="font-display text-3xl text-lagoon mb-6">Restaurants</h1>
      {restaurants.length === 0 ? (
        <p className="text-ink/50 text-sm">No restaurants yet.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-ink/50 border-b border-ink/10">
              <th className="py-2 font-normal">Name</th>
              <th className="py-2 font-normal">Destination</th>
              <th className="py-2 font-normal">Cuisine</th>
              <th className="py-2 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((r) => (
              <tr key={r.id} className="border-b border-ink/5">
                <td className="py-3">{r.name}</td>
                <td className="py-3 text-ink/60">{r.destination.name}</td>
                <td className="py-3 text-ink/60">{r.cuisineType}</td>
                <td className="py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-sand-dark/50">{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
