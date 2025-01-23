import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LogoLink } from "../components/LogoLink";
import { InviteUserButton } from "../components/InviteUserButton";
import { UserPill } from "../components/UserPill";
import { MobileMenu } from "../components/MobileMenu";
import { Navigation } from "../components/Navigation";
import { useAuth } from "../contexts/AuthContext";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { BranchSelect } from "../components/BranchSelect";

export const AppLayout = () => {
  const location = useLocation()
  const { user, checking } = useAuth()

  if (checking) return <LoadingScreen />
  if (!user && !checking) return <Navigate to="/login" />

  return (
    <>
      <header className="flex items-center justify-between h-20 pr-2">
        <div className="flex items-center gap-2 sm:gap-4">
          {location.pathname !== "/restaurants" && <MobileMenu />}
          <LogoLink />
          {location.pathname !== "/restaurants" && <BranchSelect />}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {location.pathname !== "/restaurants" && <InviteUserButton />}
          <UserPill />
        </div>
      </header>
      <div className="flex justify-between h-screen max-h-[calc(100vh-80px)] pb-6">
        {location.pathname !== "/restaurants" && (
          <aside className={`w-52 bg-white pr-4 overflow-y-scroll custom-scroll`}>
            <Navigation />
          </aside>
        )}
        <main className={`w-full overflow-y-scroll custom-scroll flex flex-col justify-between pr-2`}>
          <Outlet />
        </main>
      </div>

    </>
  );
};
