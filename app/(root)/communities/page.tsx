// "use client";

import Header from "@/components/shared/Main/Header";

export const dynamic = "force-dynamic";

export default function Search() {
  return (
    <>
      <Header showBackArrow label="Communities" />
      <h1 className="head-text text-left">Communities</h1>
    </>
  );
}
