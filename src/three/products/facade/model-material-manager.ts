import { LoadingManager, Material, Mesh, Object3D, TextureLoader } from "three";
import { ModelManager } from "./model_manager";

export class ModelMaterialmanagement {
  model: Object3D | null = null;
  textureLoader: TextureLoader;
  constructor(_loadingManager: LoadingManager) {
    this.model = ModelManager.getModel();

    this.textureLoader = new TextureLoader(_loadingManager);

    console.log(this.model);
  }

  setMaterial = (objectName: string, material: Material) => {
    if (!this.model) {
      this.model = ModelManager.getModel();

      if (!this.model) {
        throw new Error(
          "Model is not loaded and you are trying to manage model material already"
        );
      }
    }

    this.model?.children.forEach((obj) => {
      if (obj.name === objectName && obj instanceof Mesh) {
        obj.material = material;
      }
    });
  };
}
