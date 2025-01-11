import { Navigate, Outlet } from "react-router-dom";
import { LogoLink } from "../components/LogoLink";
import { useAuth } from "../contexts/AuthContext";
import { LoadingScreen } from "../components/ui/LoadingScreen";

export const AuthLayout = () => {

  const { user, checking } = useAuth()

  if (checking) return <LoadingScreen />
  if (user && !checking) return <Navigate to="/dashboard" />

  return <section className="w-full h-screen pt-24 flex items-center flex-col gap-8">
    <LogoLink />
    <Outlet />
  </section>;
};
