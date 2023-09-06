"use client";

import { useCallback, useState } from "react";

import useRegisterModal from "@/hooks/useRegisterModal";
import useSigninModal from "@/hooks/useSignInModal";

import Modal from "@/components/modals/Modal";
import Input from "./Input";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const signInModal = useSigninModal();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Close register modal and open sign in modal
  const onToggle = useCallback(() => {
    if (isLoading) return;

    registerModal.onClose();
    signInModal.onOpen();
  }, [isLoading, registerModal, signInModal]);

  // Register user
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // await signIn("credentials", {
      //   email,
      //   password,
      //   redirect: false,
      // })

      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <div>
        Already have an account? &nbsp;
        <span
          className="text-light-1 cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Sign in
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      title="Create an account"
      body={bodyContent}
      actionLabel="Sign up"
      footer={footerContent}
    />
  );
};

export default RegisterModal;
