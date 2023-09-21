import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(
  req: Request,
  { params }: { params?: { userId?: string } } = { params: {} } // params is optional and defaults to an empty object
) {
  if (req.method !== "GET") {
    return Response.error();
  }
  console.log("POSTS GET request");
  console.log("POSTS GET ROUTE params: ", params?.userId);

  try {
    const userId = params?.userId;

    let posts;

    if (userId && typeof userId === "string") {
      posts = await prisma.post.findMany({
        where: {
          userId: userId, //
        },
        include: {
          user: true,
          comments: true,
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

    return Response.json(posts);
  } catch (err) {
    console.error(err);
    return Response.error();
  }
}

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return Response.error();
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

  return Response.json(post);
}
