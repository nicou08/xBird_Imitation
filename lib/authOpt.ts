import { NextAuthOptions } from "next-auth";

import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "Indiana Jones",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Checking if credentials are valid
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Checking if user was found
        if (!user || !user?.hashedPassword) {
          throw new Error("No user found");
        }

        // Checking password match
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user, session }) {
  //     console.log("JWT CALLBACK", { token, session, user });

  //     // if (user) {
  //     //   token.accessToken = user.data.token;

  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //     console.log("SESSION CALLBACK", { session, token, user });
  //     return session;
  //   },
  // },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
