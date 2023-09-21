import { BsBell, BsPerson, BsPeople, BsHouse } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiHomeCircle, BiSearch } from "react-icons/bi";


export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
    icon: <BsHouse size={30} color="white" />,
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Search",
    icon: <BiSearch size={30} color="white" />,
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/notifications",
    label: "Notifications",
    icon: <BsBell size={30} color="white" />,
  },
  {
    imgURL: "/assets/community.svg",
    route: "/communities",
    label: "Communities",
    icon: <BsPeople size={30} color="white" />,
  },
  {
    imgURL: "/assets/user.svg",
    route: `/users/12345`,
    label: "Profile",
    icon: <BsPerson size={30} color="white" />,
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
