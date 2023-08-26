import Link from "next/link";
import Image from "next/image";

const TopBar = () => {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/Twitter-logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Twitter</p>
      </Link>
      TopBar
    </nav>
  );
};

export default TopBar;
