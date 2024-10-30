import { Outlet } from "react-router-dom";
import { LogoLink } from "../components/LogoLink";
import { InviteUserButton } from "../components/InviteUserButton";
import { UserPill } from "../components/UserPill";
import { MobileMenu } from "../components/MobileMenu";
import { Navigation } from "../components/Navigation";
import { useSession } from "../hooks/useSession";
import { BrandSelect } from "../components/BrandSelect";
import { BranchSelect } from "../components/BranchSelect";

export const AppLayout = () => {
  const { session } = useSession();

  return (
    <>
      <header className="flex items-center justify-between h-20 fixed sm:px-8 px-4 left-0 top-0 w-full z-20 bg-white">
        <div className="flex items-center gap-2 sm:gap-4">
          {session.branch && <MobileMenu />}
          <LogoLink showTitle={session.brand ? true : false} />
          {session.brand && <BrandSelect />}
          {session.branch && <BranchSelect />}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {session.brand && <InviteUserButton />}
          <UserPill />
        </div>
      </header>
      <div className="flex w-full relative">
        {session.branch && (
          <aside
            className={`custom-scroll fixed top-20 left-0 w-56 pb-8 pl-8 pr-4 h-[calc(100vh-64px)] overflow-y-scroll bg-white hidden sm:block`}
          >
            <Navigation />
          </aside>
        )}
        <main
          className={`p-4 sm:px-8 w-full min-h-[calc(100vh-64px)] pt-20 bg-white ${
            session.branch && "sm:ml-56"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};
