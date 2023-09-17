import Image from "next/image";

import useUser from "@/hooks/useUser";
import Avatar from "../shared/RightSideBar/Avatar";

const UserHero = ({ userId }: { userId: string }) => {
  const { data: user } = useUser(userId);

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {user?.coverImage && (
          <Image
            src={user?.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
