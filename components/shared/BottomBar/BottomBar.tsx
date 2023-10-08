"use client";

import { sidebarLinks } from "@/constants";
import BottomBarItem from "./BottomBarItem";
import { BiLogOut } from "react-icons/bi";

import userCurrentUser from "@/hooks/useCurrentUser";

const BottomBar = () => {
  const { data: currentUser } = userCurrentUser();
  return (
    <section
      className="
        md:hidden 
        overflow-hidden 
        fixed 
        bottom-0 
        w-full 
        border-t-[2px] 
        border-neutral-800 
        pb-5
        pt-5
        bg-black"
    >
      <div>
        <div className="grid grid-cols-5 text-light-1 text-heading4-medium">
          {sidebarLinks.map((link) => {
            // const isActive =
            //   (pathname.includes(link.route) && link.route.length > 1) ||
            //   pathname === link.route;
            if (link.label === "Profile") {
              return (
                <BottomBarItem
                  key={link.label}
                  label={link.label}
                  route={`/users/${currentUser?.id}`}
                  icon={link.icon}
                />
              );
            } else if (link.label === "Notifications") {
              return (
                <BottomBarItem
                  key={link.label}
                  label={link.label}
                  route={link.route}
                  icon={link.icon}
                  alert={currentUser?.hasNotifications}
                />
              );
            } else {
              return (
                <BottomBarItem
                  key={link.label}
                  label={link.label}
                  route={link.route}
                  icon={link.icon}
                />
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default BottomBar;
