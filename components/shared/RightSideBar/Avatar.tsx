"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import useUser from "@/hooks/useUser";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ userId, isLarge, hasBorder }: AvatarProps) => {
  const router = useRouter();

  const { data: user } = useUser(userId);

  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      router.push(`/users/${userId}`);
    },
    [router, userId]
  );

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={user?.profileImage || "/x_profile_placeholder_img.png"}
      />
    </div>
  );
};

export default Avatar;
