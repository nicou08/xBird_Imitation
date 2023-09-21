import Link from "next/link";
import { signOut } from "next-auth/react";

const LeftSideBarItem = ({
  label,
  route,
  icon,
  onClick,
  auth,
}: {
  label: string;
  route: string;
  icon: React.ReactElement;
  onClick?: () => void;
  auth?: boolean;
}) => {
  if (label === "Logout") {
    return (
      <button onClick={() => signOut()} className="flex flex-row items-center ">
        <div
          className="
          relative 
          rounded-full 
          h-16 
          w-16 
          flex 
          items-center 
          justify-center 
          p-4 
          hover:bg-slate-300 
          hover:bg-opacity-10 
          cursor-pointer 
          lg:hidden"
        >
          {icon}
        </div>
        <div
          className="
          relative 
          hidden 
          lg:flex 
          items-row 
          gap-4 
          p-4 
          rounded-full 
          items-row 
          hover:bg-slate-300 
          hover:bg-opacity-10 
          cursor-pointer 
          items-center"
        >
          {icon}
          <p className="hidden lg:block text-heading4-medium text-light-1">
            {label}&nbsp;&nbsp;&nbsp;
          </p>
        </div>
      </button>
    );
  }

  return (
    <Link href={route} key={label} className="flex flex-row items-center ">
      <div
        className="
          relative 
          rounded-full 
          h-16 
          w-16 
          flex 
          items-center 
          justify-center 
          p-4 
          hover:bg-slate-300 
          hover:bg-opacity-10 
          cursor-pointer 
          lg:hidden"
      >
        {icon}
      </div>
      <div
        className="
          relative 
          hidden 
          lg:flex 
          items-row 
          gap-4 
          p-4 
          rounded-full 
          items-row 
          hover:bg-slate-300 
          hover:bg-opacity-10 
          cursor-pointer 
          items-center"
      >
        {icon}
        <p className="hidden lg:block text-heading4-medium text-light-1">
          {label}&nbsp;&nbsp;&nbsp;
        </p>
      </div>
    </Link>
  );
};

export default LeftSideBarItem;
