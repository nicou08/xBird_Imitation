import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface LeftSideBarItemProps {
  key: string;
  label: string;
  route: string;
  icon: React.ReactElement;
  auth?: boolean;
}

const BottomBarItem: React.FC<LeftSideBarItemProps> = ({
  key,
  label,
  route,
  icon,
}) => {
  return (
    <Link href={route} key={key} className="flex flex-col items-center ">
      <div>{icon}</div>
    </Link>
  );
};

export default BottomBarItem;
