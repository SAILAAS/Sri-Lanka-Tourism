import { prisma } from "@/lib/prisma";

async function getTours() {
  try {
    return await prisma.tourPackage.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function AdminToursPage() {
  const tours = await getTours();
  return (
    <div>
      <h1 className="font-display text-3xl text-lagoon mb-6">Tour Packages</h1>
      {tours.length === 0 ? (
        <p className="text-ink/50 text-sm">No tour packages yet.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-ink/50 border-b border-ink/10">
              <th className="py-2 font-normal">Name</th>
              <th className="py-2 font-normal">Duration</th>
              <th className="py-2 font-normal">Price</th>
              <th className="py-2 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((t) => (
              <tr key={t.id} className="border-b border-ink/5">
                <td className="py-3">{t.name}</td>
                <td className="py-3 text-ink/60">{t.durationDays} days</td>
                <td className="py-3">${t.price}</td>
                <td className="py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-sand-dark/50">{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
