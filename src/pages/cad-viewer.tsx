import React, { useEffect, useRef } from "react";

import { Navigate } from "react-router-dom";

import "../../css/canvas.css";
import "../../css/toolbar.css";
import "../../css/selection.css";
import { useAppContext } from "../../core/app-context";
import CADToolbar from "../toolbar/cad-toolbar";
import SnapToolbar from "../toolbar/snap-toolbar";
import FeatureToolbar from "../toolbar/feature-toolbar";

const CadViewer = () => {
  const [state, dispatch] = useAppContext();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      console.log("creating");
      dispatch({
        type: "START_THREE",
        payload: { canvas: canvasRef.current },
      });
    }

    return () => {
      if (!state.user) {
        console.log("ending");
        dispatch({ type: "END_THREE" });
      }
    };
  }, [state.user, dispatch]);

  if (!state.user) {
    return <Navigate to={"/login"} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("dispatching");
    dispatch({ type: "END_THREE" });
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <canvas className="webgl" ref={canvasRef}></canvas>;
      <button className="button" onClick={handleLogout}>
        Logout
      </button>
      {/* <div className="buttons-container">
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
        <CadFeaturesUI />
      </div> */}
      {/* <CADToolbar /> */}
      <CADToolbar />
      <SnapToolbar />
      <FeatureToolbar />
    </>
  );
};

export default CadViewer;
