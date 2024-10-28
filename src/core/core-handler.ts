import { Action } from "../middleware/actions";
import { threeHandler } from "../middleware/three-handler";

export const executeCore = async (action: Action) => {
  switch (action.type) {
    case "START_THREE":
      threeHandler.start(action.payload.canvas);
      break;
    case "END_THREE":
      threeHandler.dispose();
      break;
    case "SNAP_OPTIONS":
      threeHandler.setSnapOptions(action.payload.options);
      break;
    case "DRAW": {
      const { geomType, isRecursive } = action.payload;
      threeHandler.draw(geomType, isRecursive);
      break;
    }
    case "FIND_POINT_REALTION_TO_LINE":
      threeHandler.findPointRelationToLine();
      break;
    case "GENERATE_POINT_LINE_REL_DATASET":
      await threeHandler.generateLinePointRelData(action.payload.model);
      break;
      case 'TEST':
        threeHandler.test()
        break;
    default:
      return;
  }
};
