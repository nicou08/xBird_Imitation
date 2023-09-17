import { format } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import { useMemo } from "react";

import useUser from "@/hooks/useUser";
import userCurrentUser from "@/hooks/useCurrentUser";
import Button from "../modals/Button";

const UserBio = ({ userId }: { userId: string }) => {
  const { data: currentUser } = userCurrentUser();
  const { data: user } = useUser(userId);

  // console.log("USERBIOOOO");
  // console.log("currentUser:", currentUser);
  // console.log("fetchedUser:", user);

  const createdAt = useMemo(() => {
    if (!user?.createdAt) {
      return null;
    }

    return format(new Date(user.createdAt), "MMMM yyyy");
  }, [user?.createdAt]);

  console.log("createdAt:", createdAt);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={() => {}} />
        ) : (
          <Button secondary label="Follow" onClick={() => {}} />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <div className="text-light-1 text-base-semibold">{user?.name}</div>
          <div className=" text-neutral-500 text-body1-regular">
            @{user?.username}
          </div>
          <div className="flex flex-col mt-4">
            <div className="text-light-1">{user?.bio}</div>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <div className="">Joined {createdAt}</div>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <div className="text-light-1">{user?.followingIds?.length}</div>
            <div className="text-neutral-500">Following</div>
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="text-light-1">{user?.followersCount || 0}</div>
            <div className="text-neutral-500">Followers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
