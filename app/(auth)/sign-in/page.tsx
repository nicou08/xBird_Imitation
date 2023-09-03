"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Welcome() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="hidden md:block md:w-1/2">
        <div className="text-light-1 flex justify-center items-center h-screen">
          <Image src="x-twitter.svg" alt="logo" width={350} height={350} />
        </div>
      </div>
      <div className="flex flex-col md:justify-center md:w-1/2 h-screen md:mt-[-10rem]">
        <div className="md:hidden p-10">
          <Image src="x-twitter.svg" alt="logo" width={50} height={50} />
        </div>
        <div className="text-light-2 text-heading13-bold sm:text-heading12-bold p-10">
          Happening now
        </div>
        <div className="text-light-2 text-heading3-bold pl-10">Join Today.</div>
        <div className="p-10">
          <button
            onClick={() => signIn()}
            className="bg-black hover:bg-sky-800 hover:bg-opacity-30 text-blue text-base-semibold rounded-full outline outline-1 outline-neutral-500 w-80 h-10"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
