import { LoadingManager, Object3D } from "three";
import { Rhino3dmLoader } from "three/examples/jsm/Addons.js";

export class ModelManager {
  private static instance: ModelManager | null;

  public model: Object3D | null = null;
  public modelPath: string;

  private constructor(_modelPath: string) {
    this.modelPath = _modelPath;
  }

  private static load = async (
    rhinoFilePath: string,
    _loadingManager: LoadingManager
  ) => {
    const loader = new Rhino3dmLoader(_loadingManager);
    loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@8.0.1/");

    return await loader.loadAsync(rhinoFilePath, (progress) => {
      console.log((progress.loaded / progress.total) * 100 + "%");
    });
  };

  public static getInstance = async (
    _modelPath?: string,
    _loadingManager?: LoadingManager
  ): Promise<ModelManager> => {
    if (!ModelManager.instance) {
      if (!_modelPath || !_loadingManager) {
        throw new Error("ModelManager requires model path to load the model.");
      }

      ModelManager.instance = new ModelManager(_modelPath);
      ModelManager.instance.model = await this.load(
        _modelPath,
        _loadingManager
      );
    }

    return ModelManager.instance;
  };

  public static getModel = () => {
    if (ModelManager.instance) return ModelManager.instance.model;
    else return null;
  };

  public static getObjectsByNames = (
    model: Object3D,
    names: string[]
  ): Object3D[] => {
    const foundObjs: Object3D[] = [];

    model.traverse((child) => {
      if (names.includes(child.name)) {
        foundObjs.push(child);
      }
    });
    return foundObjs;
  };
}
