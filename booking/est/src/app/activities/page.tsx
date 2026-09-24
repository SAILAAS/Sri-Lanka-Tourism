import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getActivities() {
  try {
    return await prisma.activity.findMany({ where: { status: "APPROVED" }, include: { destination: true }, orderBy: { name: "asc" } });
  } catch {
    return [];
  }
}

export default async function ActivitiesPage() {
  const activities = await getActivities();
  return (
    <div className="max-w-6xl mx-auto px-5 py-16">
      <p className="text-clay text-sm mb-2">Do</p>
      <h1 className="font-display text-4xl text-lagoon mb-8">Activities</h1>
      {activities.length === 0 ? (
        <div className="border border-dashed border-ink/20 rounded-sm p-10 text-center text-ink/60">No activities listed yet.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((a) => (
            <Link key={a.id} href={`/activities/${a.slug}`} className="stub-card block p-5">
              <p className="text-xs text-clay mb-1">{a.destination.name}</p>
              <h3 className="font-display text-xl text-lagoon mb-1">{a.name}</h3>
              <p className="text-sm text-ink/60">{a.category} · ${a.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
