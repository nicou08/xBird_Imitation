import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") return { status: 405 };

  try {
    const { postId } = await req.json();

    const { currentUser } = await serverAuth();

    if (!postId || typeof postId !== "string") {
      return NextResponse.json({ error: "postId is invalid" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 400 });
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

    return NextResponse.json(updatedPost);
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
    const { postId } = await req.json();

    const { currentUser } = await serverAuth();

    if (!postId || typeof postId !== "string") {
      return NextResponse.json({ error: "postId is invalid" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 400 });
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

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Some Internal Server error" },
      { status: 500 }
    );
  }
}
