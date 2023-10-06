import { getServerSession } from "next-auth";

import prisma from "@/lib/prismadb";
import { authOptions } from "./authOpt";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);
  console.log("serverAuth::session", session);
  console.log("Hello from serverAuthh");
  console.log("serverAuth:prismadb", prisma);
  console.log("What is good");
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
  console.log("serverAuth:currentUser", currentUser);

  return { currentUser };
};

export default serverAuth;
