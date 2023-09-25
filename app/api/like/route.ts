import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function POST(req: Request) {
  if (req.method !== "POST") return { status: 405 };

  try {
    const { postId } = await req.json();

    const { currentUser } = await serverAuth();

    if (!postId || typeof postId !== "string") {
      throw new Error("postId is invalid");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    updatedLikedIds.push(currentUser.id);

    // This is the notification
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone liked your tweet!",
            userId: post.userId,
          },
        });

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotifications: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return Response.json(updatedPost);
  } catch (error) {
    console.error(error);
    return { status: 500 };
  }
}

export async function DELETE(req: Request) {
  if (req.method !== "DELETE") return { status: 405 };

  try {
    const { postId } = await req.json();

    const { currentUser } = await serverAuth();

    if (!postId || typeof postId !== "string") {
      throw new Error("postId is invalid");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    updatedLikedIds = updatedLikedIds.filter(
      (likedId) => likedId !== currentUser?.id
    );

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return Response.json(updatedPost);
  } catch (error) {
    console.error(error);
    return { status: 500 };
  }
}
