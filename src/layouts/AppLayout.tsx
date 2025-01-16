import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LogoLink } from "../components/LogoLink";
import { InviteUserButton } from "../components/InviteUserButton";
import { UserPill } from "../components/UserPill";
import { MobileMenu } from "../components/MobileMenu";
import { Navigation } from "../components/Navigation";
import { BrandSelect } from "../components/BrandSelect";
import { BranchSelect } from "../components/BranchSelect";
import { useAuth } from "../contexts/AuthContext";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { useRestaurant } from "../contexts/RestaurantContext";

export const AppLayout = () => {
  const location = useLocation()
  const { user, checking } = useAuth()
  const { brand, branch } = useRestaurant()

  if (checking) return <LoadingScreen />
  if (!user && !checking) return <Navigate to="/login" />
  if (location.pathname !== "/brands" && (!brand || !branch)) return <Navigate to={"/brands"} />

  return (
    <>
      <header className="flex items-center justify-between h-20">
        <div className="flex items-center gap-2 sm:gap-4">
          {branch && <MobileMenu />}
          <LogoLink showTitle={brand ? true : false} />
          {brand && <BrandSelect />}
          {branch && <BranchSelect />}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {brand && <InviteUserButton />}
          <UserPill />
        </div>
      </header>
      <div className="flex justify-between">
        {branch && user && (
          <aside className={`w-52 bg-white pr-4 pb-6 h-screen max-h-[calc(100vh-80px)] overflow-y-scroll custom-scroll`}>
            <Navigation />
          </aside>
        )}
        <main className={`w-full h-screen max-h-[calc(100vh-80px)] overflow-y-scroll p-6 custom-scroll`}>
          <Outlet />
        </main>
      </div>
    </>
  );
};
