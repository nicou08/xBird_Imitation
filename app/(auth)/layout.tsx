import "../globals.css";

import RegisterModal from "@/components/modals/RegisterModal";
import SignInModal from "@/components/modals/SignInModal";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Sign-in to Twitter / X",
  description: "Twitter Clone",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <RegisterModal />
      <SignInModal />
      {children}
    </>
  );
}
