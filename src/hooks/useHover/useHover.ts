import { useState } from "react";

interface HoverProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function useHover() {
  const [isHovered, setIsHovered] = useState(false);

  const mouseOver = () => setIsHovered(true);
  const mouseOut = () => setIsHovered(false);

  const hoverProps = {
    onMouseEnter: mouseOver,
    onMouseLeave: mouseOut,
  };

  return [isHovered, hoverProps] as [boolean, HoverProps];
}

export default useHover;
