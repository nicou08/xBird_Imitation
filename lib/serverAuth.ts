import { getServerSession } from "next-auth";

import prisma from "@/lib/prismadb";
import { authOptions } from "./authOpt";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in!");
  }

  return { currentUser };
};

export default serverAuth;
