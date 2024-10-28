import { Object3D } from "three";

export abstract class DrawableBase {
  static onObjectCreated: (obj: Object3D) => void;
  static color: string = "white";
  static isRecursive = false;
}
