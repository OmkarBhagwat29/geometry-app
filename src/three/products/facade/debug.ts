import GUI from "lil-gui";
import { Light } from "three";
import "../../../css/debug.css";

export class Debug {
  static gui = new GUI();

  static debugLight = (light: Light) => {
    console.log(this.gui.domElement);

    this.gui.add(light, "intensity").min(0).max(50);

    this.gui.add(light.position, "y");
  };

  static Dispose = () => {
    console.log("gui destroying");
    this.gui.destroy();
  };
}
