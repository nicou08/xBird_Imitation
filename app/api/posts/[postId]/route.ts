import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    console.log("params: ", params.postId);
    const postId = params.postId;

    if (!postId || typeof postId !== "string") {
      return NextResponse.json({ error: "postId is invalid" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Some Internal Server error" },
      { status: 500 }
    );
  }
}
