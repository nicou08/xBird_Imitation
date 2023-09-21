import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

import userCurrentUser from "@/hooks/useCurrentUser";

import Avatar from "@/components/shared/RightSideBar/Avatar";

const PostItem = ({
  data,
  userId,
}: {
  data: Record<string, any>;
  userId?: string;
}) => {
  const router = useRouter();

  const { data: currentUser } = userCurrentUser();

  const LikedIcon = AiOutlineHeart;

  const goToUser = useCallback(
    (event: any) => {
      // as
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback((event: any) => {
    event.stopPropagation();
  }, []);

  const createAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <div
              onClick={goToUser}
              className="text-light-1 text-body-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
            </div>
            <span
              onClick={goToUser}
              className="
              text-neutral-500
              cursor-pointer
              hover:underline
              hidden
              md:block"
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-500">{createAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <div>&nbsp;{data.comments?.length}</div>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              {/* <LikeIcon color={hasLiked ? "red" : ""} size={20} /> */}
              <LikedIcon color={""} size={20} />
              <div>&nbsp;{data.comments?.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
