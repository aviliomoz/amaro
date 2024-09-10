import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigation } from "./Navigation";
import { useLocation } from "react-router-dom";

export const MobileMenu = () => {
  const location = useLocation();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(false);
  }, [location.pathname]);

  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className="sm:hidden size-9 border flex justify-center items-center rounded-full hover:bg-stone-50"
      >
        {show ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>
      {show && (
        <div className="custom-scroll absolute top-full mt-7 border rounded-md overflow-y-scroll p-4 bg-white h-[calc(100vh-200px)]">
          <Navigation />
        </div>
      )}
    </div>
  );
};
