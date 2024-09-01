import { Link } from "react-router-dom";
import { PATHS } from "../utils/paths";

export const Navigation = () => {
  return (
    <nav className="h-fit border shadow-sm rounded-md p-4 bg-white w-56 hidden sm:block">
      <ul className="flex flex-col gap-4">
        {PATHS.map((group) => (
          <li key={group.title}>
            <h3 className="text-[11px] font-medium tracking-widest text-stone-500 mb-1">
              {group.title}
            </h3>
            <ul className="flex flex-col gap-0.5">
              {group.paths.map((path) => (
                <Link
                  key={path.name}
                  to={path.url}
                  className={`flex items-center gap-3 text-sm px-2 py-1 rounded-md hover:bg-stone-50 border ${
                    location.pathname.includes(path.url)
                      ? "bg-stone-50 font-medium border-stone-200 shadow-sm"
                      : "border-transparent"
                  }`}
                >
                  <path.icon
                    className={`size-4 ${
                      location.pathname.includes(path.url) ? "" : ""
                    }`}
                  />
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
