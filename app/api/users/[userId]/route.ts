import prisma from "@/lib/prismadb";

export async function GET(
  req: Request,
  context: { params: { userId: string } }
) {
  if (req.method !== "GET") {
    return Response.error();
  }

  try {
    const userId = context.params.userId;

    if (!userId) {
      throw new Error("userId is invalid");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return Response.json({ ...existingUser, followersCount });
  } catch (err) {
    console.error(err);
    return Response.error();
  }
}
