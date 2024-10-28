import React, { FC, useState } from "react";
import Tooltip from "./tooltip";
import "../../css/tooltip.css";

interface TooltipWrapperProps {
  message: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRightClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}

const TooltipWrapper: FC<TooltipWrapperProps> = ({
  message,
  children,
  onClick,
  onRightClick,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowTooltip(true);
    const rect = e.currentTarget.getBoundingClientRect();

    setTooltipPosition({
      top: rect.bottom, // Position below the item
      left: e.clientX, // Centered below the item
    });
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ userSelect: "none" }}
    >
      <div
        className="toolbar-item"
        onClick={onClick}
        onContextMenu={onRightClick}
      >
        {children}
      </div>

      {showTooltip && (
        <Tooltip
          message={message}
          top={tooltipPosition.top}
          left={tooltipPosition.left}
        />
      )}
    </div>
  );
};

export default TooltipWrapper;
