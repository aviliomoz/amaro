import { Navigate, Outlet } from "react-router-dom";
import { LogoLink } from "../components/LogoLink";
import { UserPill } from "../components/UserPill";
import { Navigation } from "../components/Navigation";
import { useAuth } from "../contexts/AuthContext";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { RestaurantSelect } from "../components/RestaurantSelect";
import { useRestaurant } from "../contexts/RestaurantContext";
import { Slash } from "../components/ui/Slash";
import { OptionsWidget } from "../components/OptionsWidget";

export const AppLayout = () => {
  const { user, checking } = useAuth()
  const { restaurant } = useRestaurant()

  if (checking) return <LoadingScreen />
  if (!user && !checking) return <Navigate to="/login" />

  return (
    <>
      <header className="flex items-center justify-between px-4 h-12 border-b fixed bg-white w-full z-10">
        <div className="flex items-center gap-3">
          <LogoLink />
          {restaurant && <>
            <Slash />
            <RestaurantSelect />
          </>}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <OptionsWidget />
          <UserPill />
        </div>
      </header>
      <aside className={`group fixed top-12 z-10 h-[calc(100vh-48px)] w-14 bg-white overflow-y-scroll custom-scroll border-r p-2 hover:w-48 transition-all duration-200 ease-in-out shadow-md`}>
        <Navigation />
      </aside>
      <main className={`w-full overflow-y-scroll custom-scroll flex flex-col pl-20 pr-4 pt-16 pb-8 min-h-screen`}>
        <Outlet />
      </main>

    </>
  );
};
