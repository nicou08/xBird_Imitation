import "../globals.css";

import { StrictMode } from "react";

import Modal from "@/components/modals/Modal";
import RegisterModal from "@/components/modals/RegisterModal";
import SignInModal from "@/components/modals/SignInModal";

export const metadata = {
  title: "Sign-in to Twitter / X",
  description: "Twitter Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black h-screen">
        <RegisterModal />
        <SignInModal />
        {children}
      </body>
    </html>
  );
}
