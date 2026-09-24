import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

async function getActivity(slug: string) {
  try {
    return await prisma.activity.findUnique({ where: { slug }, include: { destination: true, reviews: { include: { user: true } } } });
  } catch {
    return null;
  }
}

export default async function ActivityDetailPage({ params }: { params: { slug: string } }) {
  const activity = await getActivity(params.slug);
  if (!activity) notFound();

  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <p className="text-clay text-sm mb-2">{activity.destination.name} · {activity.category}</p>
      <h1 className="font-display text-4xl text-lagoon mb-4">{activity.name}</h1>
      <p className="text-ink/70 leading-relaxed max-w-2xl mb-8">{activity.description}</p>
      <p className="text-lg mb-6">${activity.price} · {activity.durationHours}h</p>
      {/* TODO: booking form — POST { type: "ACTIVITY", itemId: activity.id, ... } to /api/bookings */}
      <button className="px-6 py-3 bg-clay text-sand rounded-sm">Book this activity</button>
    </div>
  );
}
