import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  console.log("Notifications ROUTE");
  try {
    const userId = params.userId;
    //console.log("Notifications USERID: ", userId);

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "userId is invalid" }, { status: 400 });
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Here hasNotification has to be set to false because the user has
    // just visited the page, meaning they already saw the notifications
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotifications: false,
      },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Some Internal Server error" },
      { status: 500 }
    );
  }
}
