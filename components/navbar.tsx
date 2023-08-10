"use client";

import { usePathname } from "next/navigation";
import { MainNav } from "./main-nav";
import TeamSwitcher from "./team-switcher";
import { UserNav } from "./user-nav";

const Navbar = () => {
  const router = usePathname();
  const showNavbar = router.startsWith("/auth") ? false : true;
  return showNavbar ? (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <TeamSwitcher />
          <UserNav />
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Navbar;
