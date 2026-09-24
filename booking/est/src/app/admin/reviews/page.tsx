import { prisma } from "@/lib/prisma";

async function getReviews() {
  try {
    return await prisma.review.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { user: true } });
  } catch {
    return [];
  }
}

export default async function AdminReviewsPage() {
  const reviews = await getReviews();
  return (
    <div>
      <h1 className="font-display text-3xl text-lagoon mb-6">Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-ink/50 text-sm">No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((r) => (
            <li key={r.id} className="border border-ink/10 rounded-sm p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{r.user.name}</p>
                <p className="text-xs text-clay">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
              </div>
              <p className="text-sm text-ink/70">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
