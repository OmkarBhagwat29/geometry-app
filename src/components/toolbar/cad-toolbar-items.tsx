import React from "react";
import PointUI from "./cad-items/point-ui";
import LineUI from "./cad-items/line-ui";
import PolylineUI from "./cad-items/polyline.-ui";
import { CadItemsProvider } from "../../contexts";

const CADToolbarItems = () => {

  return (

      <div className="toolbar-items">
        <PointUI />
        <LineUI />
        <PolylineUI />
      </div>

  );
};

export default CADToolbarItems;
