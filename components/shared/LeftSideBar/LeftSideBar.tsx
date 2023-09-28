"use client";

import { sidebarLinks } from "@/constants";
import LeftSideBarLogo from "./LeftSideBarLogo";
import LeftSideBarItem from "./LeftSideBarItem";
import PostButton from "./PostButton";

import userCurrentUser from "@/hooks/useCurrentUser";

import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";

const LeftSideBar = () => {
  // const router = useRouter();
  // const pathname = usePathname();

  const { data: currentUser } = userCurrentUser();

  return (
    <section className="hidden md:block col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end h-full">
        <div className="lg-w-[230px] h-full">
          <LeftSideBarLogo />

          {sidebarLinks.map((link) => {
            // const isActive =
            //   (pathname.includes(link.route) && link.route.length > 1) ||
            //   pathname === link.route;
            if (link.label === "Profile") {
              return (
                <LeftSideBarItem
                  key={link.label}
                  label={link.label}
                  route={`/users/${currentUser?.id}`}
                  icon={link.icon}
                />
              );
            } else if (link.label === "Notifications") {
              return (
                <LeftSideBarItem
                  key={link.label}
                  label={link.label}
                  route={link.route}
                  icon={link.icon}
                  alert={currentUser?.hasNotifications}
                />
              );
            } else {
              return (
                <LeftSideBarItem
                  key={link.label}
                  label={link.label}
                  route={link.route}
                  icon={link.icon}
                />
              );
            }
          })}

          <PostButton />
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
