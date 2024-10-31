import { Perf } from "r3f-perf";
import Scene from "../../three/components/Scene";
import SceneObjects from "../../three/components/scene-objects";
import GeometryWrapper from "../../three/components/geometry/geometry-wrapper";

const SceneWrap = () => {
  return (
    <Scene>
      <Perf />
      <GeometryWrapper />
      <SceneObjects />
    </Scene>
  );
};

export default SceneWrap;
