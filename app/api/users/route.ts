import prisma from "@/lib/prismadb";

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return Response.error();
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(users);
  } catch (err) {
    console.error(err);
    return Response.error();
  }
}
