//"use client";

//import { getServerSession } from "next-auth";
//import { authOptions } from "@/lib/authOpt";

import Header from "@/components/shared/Main/Header";
import SearchComp from "@/components/forms/SearchComp";

//export const dynamic = "force-dynamic";

export default async function Search() {
  // const session = await getServerSession(authOptions);
  // console.log("Search getServerSession: ", session);

  //const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Header showBackArrow label="Search" />
      <SearchComp />
    </>
  );
}
