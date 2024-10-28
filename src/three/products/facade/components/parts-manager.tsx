import React from "react";
import { useModel } from "../../../components/use-model";
import Outerframe from "./parts/outerframe";
import GlassPanels from "./parts/glass-panels";
import FrontPanels from "./parts/front-panels";
import VerticalLouvers from "./parts/vertical-louvers";
import GlassCasing from "./parts/glass-casing";
import Holders from "./parts/holders";
import BackPanels from "./parts/back=panels";

const PartsManager = () => {
  const { loaded } = useModel();
  return (
    <>
      {loaded && (
        <>
          <Outerframe />
          <GlassPanels />
          <FrontPanels />
          <VerticalLouvers />
          <GlassCasing />
          <Holders />
          <BackPanels />
        </>
      )}
    </>
  );
};

export default PartsManager;
