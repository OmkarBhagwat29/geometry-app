import { Plane, PlaneHelper, Vector3 } from "three";

export class Constant {
  public static cPlane: Plane = new Plane(new Vector3(0, 1, 0));

  public static getPlaneHelper = (size: number = 1) => {
    const helper = new PlaneHelper(this.cPlane, size, 0xffff00);

    return helper;
  };

  public static cursorPath = "url('./cross.png') 16 16,auto";
}
