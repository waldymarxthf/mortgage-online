import React from "react";
import { WarningCircleIcon } from "~shared/icons/warning-circle-icon";

interface AlertProps {
  isVisible: boolean;
  children: React.ReactNode;
}

export function Alert({ children, isVisible }: AlertProps) {
  return (
    <>
      <div
        className={`relative mt-3 flex h-11 w-input flex-col justify-center rounded-md bg-input px-8 text-xs transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <WarningCircleIcon className="absolute left-3 top-2" />
        {children}
      </div>
    </>
  );
}
