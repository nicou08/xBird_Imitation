import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOpt";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
