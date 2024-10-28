import React from "react";
import PointLineRel from "./feature-items/point-line-rel";
import Test from "./feature-items/test";

const FeatureItems = () => {
  return (
    <div className=" toolbar-items">
      <PointLineRel />
      <Test />
    </div>
  );
};

export default FeatureItems;
