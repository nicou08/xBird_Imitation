import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useMemo } from "react";
import { redirect } from "next/navigation";

import userCurrentUser from "./useCurrentUser";
import useUser from "./useUser";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = userCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser?.followingIds, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      redirect("/sign-in");
    }

    try {
      let request;

      if (isFollowing) {
        // In this case, we need data because it is how DELETE accepts
        // a request
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        // But in post you can just pass it on like this the userId
        request = () => axios.post("/api/follow", { userId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success("Success in following user");
    } catch (error) {
      console.error(error);
      toast.error("Error in following");
    }
  }, [currentUser, mutateCurrentUser, mutateFetchedUser, isFollowing, userId]);

  return { isFollowing, toggleFollow };
};

export default useFollow;
