import { getServerSession } from "next-auth";

import prisma from "@/lib/prismadb";
import { authOptions } from "./authOpt";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);
  console.log("serverAuth::session", session);

  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    console.log("currentUser not found");
    throw new Error("Not signed in!");
  }
  console.log("serverAuth:currentUser.id", currentUser.id);
  console.log("serverAuth:currentUser.id", currentUser.name);
  return { currentUser };
};

export default serverAuth;
