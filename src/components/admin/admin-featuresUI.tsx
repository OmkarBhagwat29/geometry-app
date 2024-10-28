import React, { useState } from "react";
import { pointRelationModel } from "../ai-models/point-relation-model";
import { useAppContext } from "../core/app-context";


const AdminFeaturesUI = () => {
  const [, dispatch] = useAppContext();
  const [count, setCount] = useState(1000);
  const [min, setMin] = useState(-100);
  const [max, setMax] = useState(100);

  const onPointRealtionToLine = async () => {
    const relMoel: pointRelationModel = {
      sampleCount: count,
      minRange: min,
      maxRange: max,
    };

    dispatch({
      type: "GENERATE_POINT_LINE_REL_DATASET",
      payload: { model: relMoel },
    });
  };
  return (
    <>
      <div className="train-ai-rel">
        <div className="sample-count">
          <label>Sample Count:</label>
          <input
            className="count-input"
            type="number"
            placeholder="1000"
            onChange={(e) => setCount(Number(e.target.value))}
          ></input>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Min Range:</label>
          <input
            style={{ width: "50px", height: "25px", marginLeft: "10px" }}
            type="number"
            placeholder="-100"
            min={-1000}
            max={0}
            onChange={(e) => setMin(Number(e.target.value))}
          ></input>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Max Range:</label>
          <input
            style={{ width: "50px", height: "25px", marginLeft: "10px" }}
            type="number"
            placeholder="100"
            min={1}
            max={1000}
            onChange={(e) => setMax(Number(e.target.value))}
          ></input>
        </div>

        <button
          className="button"
          style={{ marginTop: "10px" }}
          onClick={onPointRealtionToLine}
        >
          train point rel to line
        </button>
      </div>

    </>
  );
};

export default AdminFeaturesUI;
