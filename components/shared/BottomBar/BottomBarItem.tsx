import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { IconType } from "react-icons";

const BottomBarItem = ({
  label,
  route,
  icon,
  onClick,
  auth,
  alert,
}: {
  label: string;
  route: string;
  icon: React.ReactElement;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}) => {
  return (
    <Link href={route} key={label} className="flex flex-col items-center ">
      <div>{icon}</div>
    </Link>
  );
};

export default BottomBarItem;
