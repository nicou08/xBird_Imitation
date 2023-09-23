import prisma from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  if (req.method !== "GET") {
    return Response.error();
  }

  try {
    console.log("params: ", params.postId);
    const postId = params.postId;

    if (!postId || typeof postId !== "string") {
      throw new Error("postId is invalid");
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

    return Response.json(post);
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}
