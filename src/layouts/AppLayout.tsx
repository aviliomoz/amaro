import { Outlet, useLocation } from "react-router-dom";
import { LogoLink } from "../components/LogoLink";
import { RestaurantPill } from "../components/RestaurantPill";
import { NotificationsButton } from "../components/NotificationsButton";
import { InviteUserButton } from "../components/InviteUserButton";
import { UserPill } from "../components/UserPill";
import { MobileMenuButton } from "../components/MobileMenuButton";
import { Navigation } from "../components/Navigation";

export const AppLayout = () => {
  const location = useLocation();
  const restaurant = location.pathname.includes("/restaurant");

  return (
    <>
      <header className="flex items-center justify-between mb-4 h-10 fixed px-4 pt-6 left-0 top-0 w-full bg-slate-300 z-50">
        <div className="flex items-center gap-2 sm:gap-4">
          <LogoLink />
          {restaurant && <RestaurantPill />}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {restaurant && <InviteUserButton />}
          <NotificationsButton />
          <UserPill />
          <MobileMenuButton />
        </div>
      </header>
      <div className="flex w-full gap-2 mb-4 relative">
        {restaurant && <Navigation />}
        <main
          className={`p-4 w-full min-h-[calc(100vh-88px)] h-[3000px] sm:ml-56 ${
            restaurant ? "col-span-10" : "col-span-full"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};
