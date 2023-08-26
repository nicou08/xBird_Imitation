import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Inter } from "next/font/google";

import "../globals.css";

export const metadata = {
  title: "Twitter Threads",
  description: "A Next.js 13 Twitter Threads Clone",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="inter.className">{children}</body>
    </html>
  );
}
