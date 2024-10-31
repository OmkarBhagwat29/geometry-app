import React from "react";
import PointLineRel from "./feature-items/point-line-rel";
import Test from "./feature-items/test";
import Fk from "./feature-items/Fk";

const FeatureItems = () => {
  return (
    <div className=" toolbar-items">
      <PointLineRel />
      <Test />
      <Fk />
    </div>
  );
};

export default FeatureItems;
