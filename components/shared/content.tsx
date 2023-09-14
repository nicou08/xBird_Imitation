import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOpt";
import { redirect } from "next/navigation";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

import BottomBar from "@/components/shared/BottomBar/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar/RightSideBar";
import { get } from "http";

interface MainContentProps {
  children: React.ReactNode;
}

// const MainContent: React.FC<MainContentProps> = ({ children }) => {
// const { data: session } = useSession();
// const router = useRouter();

// useEffect(() => {
//   if (!session) {
//     router.push("/sign-in");
//   }
// }, [session, router]);
const MainContent = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  console.log("here is session:");
  console.log(session);

  if (session === null) {
    return redirect("/sign-in");
  }

  return (
    <>
      {session ? (
        <div className="container h-full mx-auto xl:px-30 max-w-6xl">
          <main className="grid lg:grid-cols-4 md:grid-cols-8 grid-cols-1 h-full">
            <LeftSideBar />

            <section
              className="
                col-span-1
                md:col-span-5
                lg:col-span-2
                border-x[1px] 
                border 
                border-neutral-800"
            >
              {children}
            </section>

            <RightSideBar />

            <BottomBar />
          </main>
        </div>
      ) : (
        <div className="text-light-1 flex justify-center items-center h-screen">
          <Image src="x-twitter.svg" alt="logo" width={100} height={100} />
        </div>
      )}
    </>
  );
};

export default MainContent;
