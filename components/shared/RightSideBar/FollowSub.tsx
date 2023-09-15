"use client";

import useUsers from "@/hooks/useUsers";
import Avatar from "./Avatar";

const FollowBar = () => {
  const { data: users } = useUsers();

  if (!users || users.length === 0) return null;

  return (
    <div className="px-6 py-4">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-light-1 text-heading4-medium">Who to Follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col gap-1">
                <div className="text-light-1 text-heading5-medium">
                  {user.name}
                </div>
                <div className="text-neutral-400 text-body2-medium">
                  @{user.username}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
