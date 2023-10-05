import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { userId: string } }
) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const userId = context.params.userId;

    if (!userId) {
      return NextResponse.json({ error: "userId is invalid" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return NextResponse.json({ ...existingUser, followersCount });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Some Internal Server error" },
      { status: 500 }
    );
  }
}
