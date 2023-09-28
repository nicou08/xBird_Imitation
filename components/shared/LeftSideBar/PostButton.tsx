import Link from "next/link";

import { FaFeather } from "react-icons/fa";

const TweetButton = () => {
  return (
    <Link href="/">
      <div
        className="
          mt-6 
          lg:hidden 
          rounded-full 
          h-16 
          w-16 
          p-4
          flex 
          items-center
          justify-center
          bg-sky-500
          hover:bg-opacity-80
          transition
          cursor-pointer"
      >
        <FaFeather size={30} color="white" />
      </div>
      <div
        className="
          mt-6
          hidden
          lg:block
          px-4
          py-2
          rounded-full
          bg-sky-500
          hover:bg-opacity-80
          cursor-pointer
          transition"
      >
        <p
          className="
          hidden
          lg:block
          text-center
          text-heading3-bold
          text-light-1
          "
        >
          Post X
        </p>
      </div>
    </Link>
  );
};

export default TweetButton;
