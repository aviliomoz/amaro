import { Link } from "react-router-dom";
// import { Zap } from "lucide-react";
// import logo from "/logo3.svg";

type Props = {
  showTitle?: boolean;
  width?: "md" | "xl"
};

export function LogoLink({ showTitle = true, width = "md" }: Props) {
  return (
    <Link to={"/"} className={`flex items-center gap-2 ${width === "md" ? "text-xl" : "text-2xl"} font-bold`}>
      {/* <img src={logo} width={24} height={24} /> */}
      <span className="bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 rounded-lg size-5 relative">
        <span className="absolute bg-stone-50 rounded-full size-2 top-2 right-1"></span>
      </span>
      <span className={`${showTitle && "hidden sm:flex tracking-wider font-furai items-center gap-2 pt-0.5"}`}>SISTEMA</span>
    </Link>
  );
}

//  <span className="flex items-center gap-2 text-sm ml-2 bg-stone-50 px-2 py-1 rounded-lg border"><Zap className="size-4 stroke-orange-500 fill-orange-500"/>Server</span>
