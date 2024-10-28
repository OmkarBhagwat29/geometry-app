import React, { useEffect, useState } from "react";
import ToolbarWrapper from "./toolbar-wrapper";
import { SnapOption, snapOptionsList } from "./snap-options";
import { useAppContext } from "../../core/app-context";

const SnapToolbar = () => {
  const [, dispatch] = useAppContext();

  const [checkedStates, setCheckedStates] = useState(
    new Array(snapOptionsList.length).fill(true)
  );

  const activeIndex = snapOptionsList.indexOf("active");

  const handleCheckboxToggle = (index: number) => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index]; // Toggle the state of the clicked checkbox
    setCheckedStates(updatedCheckedStates);
  };

  useEffect(() => {
    const objs: { type: SnapOption; isActive: boolean }[] = snapOptionsList.map(
      (option, index) => {
        return { type: option, isActive: checkedStates[index] };
      }
    );

    dispatch({ type: "SNAP_OPTIONS", payload: { options: objs } });
  }, [checkedStates]);

  return (
    <div>
      <ToolbarWrapper
        positionX={120}
        positionY={10}
        gridTemplateColumns="40px 1fr"
        orientation="vertical"
      >
        <div className="toolbar-items">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "70px 70px 70px 70px 70px",
            }}
          >
            {snapOptionsList.map((option, index) => (
              <div key={index} className="toolbar-item">
                <label
                  htmlFor={`checkbox-${index}`}
                  style={{ marginRight: "5px" }}
                >
                  {option}
                </label>
                <input
                  id={`checkbox-${index}`}
                  type="checkbox"
                  checked={checkedStates[index]}
                  onChange={() => handleCheckboxToggle(index)}
                  disabled={
                    index !== activeIndex && !checkedStates[activeIndex]
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </ToolbarWrapper>
    </div>
  );
};

export default SnapToolbar;
