import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import Avatar from "../shared/RightSideBar/Avatar";

const CommentItem = ({ data }: { data: Record<string, any> }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (event: any) => {
      // Stop propagation overrides parent's onClick
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null;

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      className="
        border-b-[1px]
        border-neutral-800
        p-5
        cursor-pointer
        hover:bg-neutral-900
        transition"
    >
      <div className="flex flex-row items-start gap-3">
        <div className="flex-none">
          <Avatar userId={data.user.id} />
        </div>
        <div>
          <div className="flex flex-row item-center gap-2">
            <div
              onClick={goToUser}
              className="
                    text-light-1
                    text-body-semibold
                    cursor-pointer
                    hover:underline"
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
            <span className="text-neutral-500">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
