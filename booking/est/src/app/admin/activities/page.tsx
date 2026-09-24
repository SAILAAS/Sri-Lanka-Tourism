import { prisma } from "@/lib/prisma";

async function getActivities() {
  try {
    return await prisma.activity.findMany({ orderBy: { createdAt: "desc" }, include: { destination: true } });
  } catch {
    return [];
  }
}

export default async function AdminActivitiesPage() {
  const activities = await getActivities();
  return (
    <div>
      <h1 className="font-display text-3xl text-lagoon mb-6">Activities</h1>
      {activities.length === 0 ? (
        <p className="text-ink/50 text-sm">No activities yet.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-ink/50 border-b border-ink/10">
              <th className="py-2 font-normal">Name</th>
              <th className="py-2 font-normal">Destination</th>
              <th className="py-2 font-normal">Category</th>
              <th className="py-2 font-normal">Price</th>
              <th className="py-2 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a) => (
              <tr key={a.id} className="border-b border-ink/5">
                <td className="py-3">{a.name}</td>
                <td className="py-3 text-ink/60">{a.destination.name}</td>
                <td className="py-3 text-ink/60">{a.category}</td>
                <td className="py-3">${a.price}</td>
                <td className="py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-sand-dark/50">{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
