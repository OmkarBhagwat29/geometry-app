import {
  GeometryContext,
  GeometryProvider,
  useGeometry,
  CADType,
} from "./GeometryContext";

export {
  GeometryContext as CADItemsContext,
  GeometryProvider as CADItemsProvider,
  useGeometry as useCADItems,
};
export type { CADType };

import {
  FeatureContext,
  FeatureProvider,
  useFeature,
  FeatureType,
} from "./FeaturesContext";

export { FeatureContext, FeatureProvider, useFeature };
export type { FeatureType };
