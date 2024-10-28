import React from "react";
import { useAppContext } from "../../core/app-context";
import AdminFeaturesUI from "../admin/admin-featuresUI";

const CadFeaturesUI = () => {
  const [state, dispatch] = useAppContext();

  const drawLine = () => {
    //dispatch({ type: "DRAW_LINE" });
  };

  const drawPoint = () => {
    //dispatch({ type: "DRAW_POINT" });
  };

  const onFindRelation = () => {
    dispatch({ type: "FIND_POINT_REALTION_TO_LINE" });
  };

  return (
    <>
      <div className="draw-ln-pt-buttons">
        <button className="button" onClick={drawLine}>
          draw line
        </button>

        <button className="button" onClick={drawPoint}>
          draw point
        </button>
      </div>

      {state.user?.role === "admin" && <AdminFeaturesUI />}

      <button className="button" onClick={onFindRelation}>
        find point relation to line
      </button>
    </>
  );
};

export default CadFeaturesUI;
