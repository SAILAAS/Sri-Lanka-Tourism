import { prisma } from "@/lib/prisma";

// Pattern for admin list pages: server component, direct Prisma read.
// TODO: add role-change and suspend actions (wire to a new /api/admin/users/[id] route).

async function getUsers() {
  try {
    return await prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  } catch {
    return [];
  }
}

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1 className="font-display text-3xl text-lagoon mb-6">Users</h1>
      {users.length === 0 ? (
        <p className="text-ink/50 text-sm">No users yet.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-ink/50 border-b border-ink/10">
              <th className="py-2 font-normal">Name</th>
              <th className="py-2 font-normal">Email</th>
              <th className="py-2 font-normal">Role</th>
              <th className="py-2 font-normal">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-ink/5">
                <td className="py-3">{u.name}</td>
                <td className="py-3 text-ink/60">{u.email}</td>
                <td className="py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-sand-dark/50">{u.role}</span>
                </td>
                <td className="py-3 text-ink/60">{u.createdAt.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
