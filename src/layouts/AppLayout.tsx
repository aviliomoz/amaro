import { Outlet, useLocation } from "react-router-dom";
import { LogoLink } from "../components/LogoLink";
import { RestaurantPill } from "../components/RestaurantPill";
import { NotificationsButton } from "../components/NotificationsButton";
import { InviteUserButton } from "../components/InviteUserButton";
import { UserPill } from "../components/UserPill";
import { MobileMenu } from "../components/MobileMenu";
import { Navigation } from "../components/Navigation";

export const AppLayout = () => {
  const location = useLocation();
  const restaurant = location.pathname.includes("/restaurant");

  return (
    <>
      <header className="flex items-center justify-between h-16 fixed sm:px-8 px-4 left-0 top-0 w-full z-20 bg-white">
        <div className="flex items-center gap-2 sm:gap-4">
          {restaurant && <MobileMenu />}
          <LogoLink showTitle={restaurant} />
          {restaurant && <RestaurantPill />}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {restaurant && <InviteUserButton />}
          <NotificationsButton />
          <UserPill />
        </div>
      </header>
      <div className="flex w-full relative bg-yellow-100">
        {restaurant && (
          <aside
            className={`custom-scroll fixed top-16 left-0 w-56 py-4 pl-8 pr-2 h-[calc(100vh-64px)] overflow-y-scroll bg-white hidden sm:block`}
          >
            <Navigation />
          </aside>
        )}
        <main
          className={`p-4 sm:pr-8 w-full min-h-[calc(100vh-64px)] mt-16 bg-white ${
            restaurant && "sm:ml-56"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};
