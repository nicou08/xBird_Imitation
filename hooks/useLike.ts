import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import userCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = userCurrentUser();
  // This is the post that is being liked
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  // This is all the posts so that they are refreshed when a like is added
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  // We are checking if the current user that is logged in
  // has liked the post
  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success("Success in liking post");
    } catch (error) {
      console.error(error);
      toast.error("Error in liking post");
    }
  }, [hasLiked, mutateFetchedPost, mutateFetchedPosts, postId, currentUser]);

  return { hasLiked, toggleLike };
};

export default useLike;
