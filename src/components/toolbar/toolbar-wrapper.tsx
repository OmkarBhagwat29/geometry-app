import React, { FC, useState } from "react";

interface ToolbarWrapperProps {
  positionX: number;
  positionY: number;
  children: React.ReactNode;
  gridTemplateColumns: string;
}
const ToolbarWrapper: FC<ToolbarWrapperProps> = ({
  positionX,
  positionY,
  children,
  gridTemplateColumns,
}) => {
  const [position, setPosition] = useState({ x: positionX, y: positionY });
  const [collapsed, setCollapsed] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startY = e.clientY;

    const onMouseMove = (e: MouseEvent) => {
      const newX = position.x + e.clientX - startX;
      const newY = position.y + e.clientY - startY;

      setPosition({ x: newX, y: newY });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      style={{
        position: "absolute",
        marginTop: position.y + "px",
        marginLeft: position.x + "px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridTemplateColumns,
        }}
      >
        <div
          className="toolbar-handle"
          onMouseDown={handleMouseDown}
          onDoubleClick={() => setCollapsed(!collapsed)}
        >
          <img
            src="./icons/hamburger.png"
            style={{ padding: "2px" }}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
        {!collapsed && children}
      </div>
    </div>
  );
};

export default ToolbarWrapper;
