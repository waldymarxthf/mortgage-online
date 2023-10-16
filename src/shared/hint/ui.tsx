import { InfoIcon } from "~shared/icons/info-icon";
import { TopRightIcon } from "~shared/icons/top-right-icon";
import { useHover } from "~hooks/useHover";

export function Hint({ children }: { children: React.ReactNode }) {
  const [isHovered, hoveredProps] = useHover();
  return (
    <div>
      <InfoIcon {...hoveredProps} />
      <div
        className={`absolute z-20 mt-2 rounded-md bg-hint px-2 py-1 text-xs text-white shadow-xl transition-all duration-200 sm:w-64 ${
          isHovered ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <TopRightIcon className="absolute -top-1.5 left-2" />
        {children}
      </div>
    </div>
  );
}
