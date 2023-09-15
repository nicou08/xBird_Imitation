"use client";

import { sidebarLinks } from "@/constants";
import LeftSideBarLogo from "./LeftSideBarLogo";
import LeftSideBarItem from "./LeftSideBarItem";
import TweetButton from "./TweetButton";

import { signOut } from "next-auth/react";

import { usePathname, useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";

const LeftSideBar = () => {
  // const router = useRouter();
  // const pathname = usePathname();

  return (
    <section className="hidden md:block col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end h-full">
        <div className="lg-w-[230px] h-full">
          <LeftSideBarLogo />

          {sidebarLinks.map((link) => {
            // const isActive =
            //   (pathname.includes(link.route) && link.route.length > 1) ||
            //   pathname === link.route;

            return (
              <LeftSideBarItem
                key={link.label}
                label={link.label}
                route={link.route}
                icon={link.icon}
              />
            );
          })}

          <TweetButton />
          <div className="sticky top-[93vh]">
            <LeftSideBarItem
              key={"Logout"}
              label={"Logout"}
              route={"/sign-in"}
              onClick={() => signOut()}
              icon={<BiLogOut size={30} color="white" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeftSideBar;
