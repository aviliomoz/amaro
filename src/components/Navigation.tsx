import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../utils/paths";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="">
      <ul className="flex flex-col gap-4">
        {PATHS.map((group, index) => (
          <li key={index}>
            {group.title && (
              <h3 className="text-[11px] font-medium tracking-widest text-stone-500 mb-1 pl-2 mt-1">
                {group.title}
              </h3>
            )}
            <ul className="flex flex-col gap-0.5">
              {group.paths.map((path) => (
                <Link
                  key={path.name}
                  to={path.url}
                  className={`flex items-center gap-3 text-sm px-2 py-1 rounded-md hover:bg-stone-100 border ${
                    location.pathname.includes(path.url)
                      ? "bg-stone-100 font-medium border-stone-200 shadow-sm"
                      : "border-transparent"
                  }`}
                >
                  <path.icon className={`size-4`} />
                  {path.name}
                </Link>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};
