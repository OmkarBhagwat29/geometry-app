
import CADToolbarItems from "./cad-toolbar-items";
import ToolbarWrapper from "./toolbar-wrapper";

const CADToolbar = () => {
  return (

      <ToolbarWrapper positionX={10} positionY={70} gridTemplateColumns="50px">
        <CADToolbarItems />
      </ToolbarWrapper>

  );
};

export default CADToolbar;
