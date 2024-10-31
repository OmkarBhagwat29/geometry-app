import CADToolbar from "../toolbar/cad-toolbar";
import SnapToolbar from "../toolbar/snap-toolbar";
import FeatureToolbar from "../toolbar/feature-toolbar";

import "../../css/toolbar.css";
import "../../css/selection.css";
import "../../css/tooltip.css";

const UiWrap = () => {
  return (
    <>
      <CADToolbar />
      <SnapToolbar />
      <FeatureToolbar />
    </>
  );
};

export default UiWrap;
