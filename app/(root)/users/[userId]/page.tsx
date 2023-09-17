"use client";

import { ClipLoader } from "react-spinners";
import { useParams } from "next/navigation";

import useUser from "@/hooks/useUser";
import Header from "@/components/shared/Main/Header";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";

// The useRouter hook should be imported from next/navigation and not next/router when using the App Router
// The pathname string has been removed and is replaced by usePathname()
// The query object has been removed and is replaced by useSearchParams()

const userView = () => {
  const params = useParams();

  const userId = params.userId;
  // console.log("userId:", userId);
  const { data: user, isLoading } = useUser(userId as string);
  // console.log("fetchedUser:", user);
  // console.log("isLoadinggg: ", isLoading);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={150} />
      </div>
    );
  }

  return (
    <div>
      <Header label={user.name} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <div className="text-light-1">2what uppp</div>
    </div>
  );
};

export default userView;
