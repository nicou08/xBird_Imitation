import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params?: { userId?: string } } // params is optional and defaults to an empty object
) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  const { searchParams } = new URL(req.url);
  // console.log("searchParams: ", searchParams);
  // console.log("POSTS GET ROUTE params: ", params?.userId);

  try {
    const userId = searchParams.get("userId");
    console.log("userId: ", userId);

    let posts;

    if (userId && typeof userId === "string") {
      console.log("userId was provided: ", userId);
      posts = await prisma.post.findMany({
        where: {
          userId: userId, //
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Some Internal Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  const { currentUser } = await serverAuth();
  const { body } = await req.json();
  console.log("Body:: ", body);

  const post = await prisma.post.create({
    data: {
      body: body,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(post);
}
