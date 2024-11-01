import React from "react";
import PointLineRel from "./feature-items/point-line-rel";
import Test from "./feature-items/test";
import Fk from "./feature-items/Fk";
import Ik from "./feature-items/Ik";

const FeatureItems = () => {
  return (
    <div className=" toolbar-items">
      <PointLineRel />
      <Test />
      <Fk />
      <Ik />
    </div>
  );
};

export default FeatureItems;
