"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Destination = { id: string; name: string; region: string; slug: string };

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/destinations");
    const data = await res.json();
    setDestinations(data.destinations || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this destination? This cannot be undone.")) return;
    await fetch(`/api/destinations/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-lagoon">Destinations</h1>
        {/* TODO: wire this to a create form posting to POST /api/destinations */}
        <button className="px-4 py-2 bg-lagoon text-sand rounded-sm text-sm">+ New destination</button>
      </div>

      {loading ? (
        <p className="text-ink/50 text-sm">Loading…</p>
      ) : destinations.length === 0 ? (
        <p className="text-ink/50 text-sm">No destinations yet.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-ink/50 border-b border-ink/10">
              <th className="py-2 font-normal">Name</th>
              <th className="py-2 font-normal">Region</th>
              <th className="py-2 font-normal">Slug</th>
              <th className="py-2 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((d) => (
              <tr key={d.id} className="border-b border-ink/5">
                <td className="py-3">{d.name}</td>
                <td className="py-3 text-ink/60">{d.region}</td>
                <td className="py-3 text-ink/60">{d.slug}</td>
                <td className="py-3 text-right space-x-3">
                  <Link href={`/destinations/${d.slug}`} className="text-ocean hover:underline">View</Link>
                  <button onClick={() => handleDelete(d.id)} className="text-clay hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
