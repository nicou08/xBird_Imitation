import Header from "@/components/shared/Main/Header";

import { useSession } from "next-auth/react";

export default function Home() {
  // const { data: session } = useSession();

  // if (!session) {
  //   return (
  //     <>
  //       <div className="text-light-1">No go fam</div>
  //     </>
  //   );
  // }

  return (
    <>
      <Header label="Home" />
      <h1 className="head-text text-left">
        Tweeterrr X12345 1234 5123 45 123 34 56
      </h1>
      <p className="text-light-1"> Test of the frame asdfasdfasdf</p>
    </>
  );
}
