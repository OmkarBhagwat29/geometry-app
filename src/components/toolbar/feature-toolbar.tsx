import React from "react";
import ToolbarWrapper from "./toolbar-wrapper";
import FeatureItems from "./feature-toolbar-items";

const FeatureToolbar = () => {
  return (
    <ToolbarWrapper positionX={70} positionY={70} gridTemplateColumns="50px">
      <FeatureItems />
    </ToolbarWrapper>
  );
};

export default FeatureToolbar;
