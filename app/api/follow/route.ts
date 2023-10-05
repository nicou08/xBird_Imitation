import serverAuth from "@/lib/serverAuth";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const { userId } = await req.json();

    const { currentUser } = await serverAuth();

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "userId is invalid" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      console.log("Invalid ID");
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds.push(userId);

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    // This is the notification
    await prisma.notification.create({
      data: {
        body: "Someone followed you!",
        userId: userId,
      },
    });
    try {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hasNotifications: true,
        },
      });
    } catch (error) {
      console.log(error);
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Some Internal Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  if (req.method !== "DELETE") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const { userId } = await req.json();

    const { currentUser } = await serverAuth();

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "userId is invalid" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      console.log("Invalid ID");
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds = updatedFollowingIds.filter(
      (followingId) => followingId !== userId
    );

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Some Internal Server error" },
      { status: 500 }
    );
  }
}
