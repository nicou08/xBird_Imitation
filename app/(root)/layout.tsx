import "../globals.css";

import NextAuthProvider from "@/context/NextAuthProvider";
import { Toaster } from "react-hot-toast";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import MainContent from "@/components/shared/content";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twitter-X",
  description: "Twitter-X Clone",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <MainContent>{children}</MainContent>
    </>
  );
}
