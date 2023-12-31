"use client";

import useSigninModal from "@/hooks/useSignInModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "@/components/modals/Modal";
import Input from "./Input";

const SignInModal = () => {
  const router = useRouter();

  const signInModal = useSigninModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Close sign in modal and open register modal
  const onToggle = useCallback(() => {
    if (isLoading) return;

    signInModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, signInModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("Before sign in axios");
      // await signIn("credentials", {
      //   email,
      //   password,
      //   callbackUrl: "/",
      // });
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log("After sign in axios");
      console.log("signIN result::", result);
      if (result?.error) {
        console.log("Error signing in!! ");
        router.push("/sign-in");
      } else {
        router.push("/");
      }
      signInModal.onClose();
    } catch (error) {
      console.log("Error signing in!! ");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [signInModal, email, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <div>
        First time using Twitter / X? &nbsp;
        <span
          className="text-light-1 cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Create an account
        </span>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={signInModal.isOpen}
        onClose={signInModal.onClose}
        onSubmit={onSubmit}
        title="Sign in to Twitter"
        body={bodyContent}
        actionLabel="Sign in"
        footer={footerContent}
      />
    </>
  );
};

export default SignInModal;
