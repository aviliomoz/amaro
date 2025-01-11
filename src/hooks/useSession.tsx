import { useEffect, useState } from "react";
import { Branch, Brand } from "../utils/types";

type Session = {
  brand?: Brand;
  branch?: Branch;
};

const initialSettings: Session = {
  brand: {
    name: "Bonsai",
    id: "asdqwe1",
  },
  branch: {
    name: "Piura centro",
    id: "asdqwe3",
  },
};

const getSession = () => {
  const session = localStorage.getItem("session-settings");

  if (!session) return initialSettings;

  return JSON.parse(session) as Session;
};

export const useSession = () => {
  const [session, setSession] = useState<Session>(getSession());

  useEffect(() => {
    localStorage.setItem("session-settings", JSON.stringify(session));
  }, [session]);

  return {
    session,
    setSession,
  };
};
