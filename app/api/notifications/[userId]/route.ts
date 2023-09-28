import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  if (req.method !== "GET") return { status: 405 };
  console.log("Notifications ROUTE");
  try {
    const userId = params.userId;
    //console.log("Notifications USERID: ", userId);

    if (!userId || typeof userId !== "string") {
      throw new Error("userId is invalid");
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
    return { status: 400 };
  }
}
