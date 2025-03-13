import { X } from "lucide-react";

type Props = {
  close: () => void;
  children: React.ReactNode;
};

export function SideModal({ close, children }: Props) {
  return (
    <div
      onClick={close}
      className="z-50 fixed top-0 left-0 w-screen h-screen bg-gray-200 bg-opacity-50 flex items-center justify-end pr-4 transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`p-6 bg-white rounded-md shadow-sm relative w-full max-w-[500px] max-h-[calc(100vh-2rem)] overflow-y-scroll custom-scroll`}
      >
        <button onClick={close} className="absolute top-4 right-4">
          <X className="w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
