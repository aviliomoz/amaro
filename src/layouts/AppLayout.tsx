import { Navigate, Outlet } from "react-router-dom";
import { LogoLink } from "../components/LogoLink";
import { InviteUserButton } from "../components/InviteUserButton";
import { UserPill } from "../components/UserPill";
import { MobileMenu } from "../components/MobileMenu";
import { Navigation } from "../components/Navigation";
import { useAuth } from "../contexts/AuthContext";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { RestaurantSelect } from "../components/RestaurantSelect";
import { useRestaurant } from "../contexts/RestaurantContext";

export const AppLayout = () => {
  const { user, checking } = useAuth()
  const { restaurant } = useRestaurant()

  if (checking) return <LoadingScreen />
  if (!user && !checking) return <Navigate to="/login" />

  return (
    <>
      <header className="flex items-center justify-between h-20 pr-2">
        <div className="flex items-center gap-2 sm:gap-4">
          {restaurant && <MobileMenu />}
          <LogoLink width="xl" />
          {restaurant && <RestaurantSelect />}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {restaurant && <InviteUserButton />}
          <UserPill />
        </div>
      </header>
      <div className="flex justify-between h-screen max-h-[calc(100vh-80px)] pb-6">
        {restaurant && (
          <aside className={`w-52 bg-white pr-4 overflow-y-scroll custom-scroll`}>
            <Navigation />
          </aside>
        )}
        <main className={`w-full overflow-y-scroll custom-scroll flex flex-col ${restaurant && "pl-6"} pr-3 py-2`}>
          <Outlet />
        </main>
      </div>

    </>
  );
};
