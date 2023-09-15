import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOpt";

import Header from "@/components/shared/Main/Header";

export default async function Search() {
  const session = await getServerSession(authOptions);
  console.log("Search getServerSession: ", session);

  return (
    <>
      <Header label="Search" />
      <h1 className="head-text text-left">Search</h1>
      <p className="text-light-1"> Test of the frame</p>
    </>
  );
}
