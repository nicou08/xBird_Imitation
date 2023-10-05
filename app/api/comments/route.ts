import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
  // { params }: { params: { postId: string } }
) {
  if (req.method !== "POST") {
    NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const { currentUser } = await serverAuth();
    const { body } = await req.json();
    console.log("Comment Body: ", body);
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    console.log("Comment Post ID: ", postId);

    if (!postId || typeof postId !== "string")
      throw new Error("postId is invalid");

    const comment = await prisma.comment.create({
      data: {
        body: body,
        postId: postId,
        userId: currentUser.id,
      },
    });

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
            body: "Someone replied to your tweet!",
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

    return NextResponse.json(comment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Some Internal Server error" },
      { status: 500 }
    );
  }
}
