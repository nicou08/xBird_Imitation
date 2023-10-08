// "use client";

import Header from "@/components/shared/Main/Header";
import FollowBar from "@/components/shared/RightSideBar/FollowSub";

//export const dynamic = "force-dynamic";

export default function Search() {
  return (
    <>
      <Header showBackArrow label="Communities" />
      <FollowBar />
    </>
  );
}
