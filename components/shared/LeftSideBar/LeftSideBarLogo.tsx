import { BsTwitter } from "react-icons/bs";

const LeftSideBarLogo = () => {
  return (
    <div className="rounded-full h-16 w-16 p-4 flex items-center justify-center hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer transition">
      <BsTwitter size={30} color="white" />
    </div>
  );
};

export default LeftSideBarLogo;
