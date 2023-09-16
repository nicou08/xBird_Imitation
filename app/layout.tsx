import "./globals.css";
import { Metadata } from "next";
import NextAuthProvider from "@/context/NextAuthProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/twitter-x-icon-1.png" type="image/png" />
      </head>
      <body className={`${inter.className} bg-black h-screen`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
