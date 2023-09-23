import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  if (req.method !== "POST") return { status: 405 };

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

    return Response.json(comment);
  } catch (error) {
    console.error(error);
    return { status: 500 };
  }
}
