"use client";

import { sidebarLinks } from "@/constants";
import BottomBarItem from "./BottomBarItem";
import { BiLogOut } from "react-icons/bi";

const BottomBar = () => {
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
        bg-opacity-75"
    >
      <div>
        <div className="grid grid-cols-5 text-light-1 text-heading4-medium">
          {sidebarLinks.map((link) => {
            return (
              <BottomBarItem
                key={link.label}
                label={link.label}
                route={link.route}
                icon={link.icon}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BottomBar;
