import { ListFilter, X } from "lucide-react";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const FilterWidget = ({ children }: Props) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => setShow(!show)}
        className="flex justify-center items-center size-9 border rounded-md shadow-sm hover:bg-stone-100"
      >
        {show ? <X className="size-4" /> : <ListFilter className="size-4" />}
      </button>
      {show && (
        <div className="absolute top-full mt-2 right-0 border bg-white rounded-md p-2 flex flex-col gap-2">
          {children}
        </div>
      )}
    </div>
  );
};
