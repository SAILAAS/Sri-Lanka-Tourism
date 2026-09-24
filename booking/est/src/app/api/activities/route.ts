import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get("destination") ?? undefined;

  const activities = await prisma.activity.findMany({
    where: { status: "APPROVED", destination: destination ? { slug: destination } : undefined },
    include: { destination: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json({ activities });
}
