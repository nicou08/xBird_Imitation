"use client";

import { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

import useNotifications from "@/hooks/useNotifications";
import userCurrentUser from "@/hooks/useCurrentUser";

const NotificationFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = userCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  // When the notification has been alerted, we want to refetch the user
  // since it updated its notification alert because it has disappeared
  // in route.ts
  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        You don't have noticiations
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
        >
          <BsTwitter color="white" size={32} />
          <div className="text-white">{notification.body}</div>
        </div>
      ))}
    </div>
  );
};

export default NotificationFeed;
