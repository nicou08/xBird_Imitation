import serverAuth from "@/lib/serverAuth";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  if (req.method !== "PATCH") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  try {
    const { currentUser } = await serverAuth();
    const { name, username, bio, profileImage, coverImage } = currentUser;
    //onsole.log("api route CURRENTUSER", currentUser);
    if (!name || !username) {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 404 }
      );
    }

    const {
      name: newName,
      username: newUsername,
      bio: newBio,
      profileImage: newProfileImage,
      coverImage: newCoverImage,
    } = await req.json();
    // console.log("route newName", newName);
    // console.log("route newUsername", newUsername);
    // console.log("route newBio", newBio);
    // console.log("api route REQ.JSON", await req.json());

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: newName,
        username: newUsername,
        bio: newBio,
        profileImage: newProfileImage,
        coverImage: newCoverImage,
      },
    });
    console.log("api route UPDATEDUSER", updatedUser);
    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Some Internal Server error" },
      { status: 500 }
    );
  }
}
