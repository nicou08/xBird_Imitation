import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return Response.error();
  }

  try {
    const { currentUser } = await serverAuth();
    // console.log("API:CURRENT:ROUTE:currentUser", currentUser);
    return NextResponse.json(currentUser);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
