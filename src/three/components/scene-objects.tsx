import { useGeometry } from "../../context/GeometryContext";
import { useThree } from "@react-three/fiber";

const SceneObjects = () => {
  const { objects } = useGeometry();

  return (
    <>
      {objects.map((obj, index) => (
        <primitive key={index} object={obj} />
      ))}
    </>
  );
};

export default SceneObjects;
