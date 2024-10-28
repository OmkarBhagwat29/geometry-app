import React from "react";

interface TooltipProps {
  message: string;
  top: number;
  left: number;
}

const Tooltip: React.FC<TooltipProps> = ({ message, top, left }) => {
  return (
    <div className="tooltip" style={{ top: `${top}px`, left: `${left}px` }}>
      {message}
    </div>
  );
};

export default Tooltip;
