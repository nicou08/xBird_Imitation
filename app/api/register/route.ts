import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  console.log("BEFOREE");
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  console.log("AFTERRR");
  try {
    const { email, username, name, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 12);

    //console.log("YOOOO");
    //console.log(email, username, name, hashedPassword);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    //return Response.json({ email, username, name, hashedPassword });
    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Some Internal Server error" },
      { status: 500 }
    );
  }
}
