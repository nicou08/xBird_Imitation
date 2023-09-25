import serverAuth from "@/lib/serverAuth";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return Response.error();
  }

  try {
    const { userId } = await req.json();

    const { currentUser } = await serverAuth();

    if (!userId || typeof userId !== "string") {
      return Response.error();
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      console.log("Invalid ID");
      return Response.json({ error: "Invalid ID" }, { status: 400 });
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

    return Response.json(updatedUser);
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}

export async function DELETE(req: Request) {
  if (req.method !== "DELETE") {
    return Response.error();
  }

  try {
    const { userId } = await req.json();

    const { currentUser } = await serverAuth();

    if (!userId || typeof userId !== "string") {
      return Response.error();
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      console.log("Invalid ID");
      return Response.json({ error: "Invalid ID" }, { status: 400 });
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

    return Response.json(updatedUser);
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}
