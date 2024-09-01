import { Outlet, useLocation } from "react-router-dom";
import { Logo } from "../components/LogoLink";
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
      <header className="flex items-center justify-between mb-4 h-10">
        <div className="flex items-center gap-2 sm:gap-4">
          <Logo />
          {restaurant && <RestaurantPill />}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {restaurant && <InviteUserButton />}
          <NotificationsButton />
          <UserPill />
          <MobileMenuButton />
        </div>
      </header>
      <div className="flex w-full gap-3 mb-4">
        {restaurant && <Navigation />}
        <main
          className={`p-4 bg-stone-50 rounded-md w-full shadow-sm border h-fit min-h-[calc(100vh-88px)] ${
            restaurant ? "col-span-10" : "col-span-full"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};
