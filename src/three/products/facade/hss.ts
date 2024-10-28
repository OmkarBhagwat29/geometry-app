import SceneManager from "../../scene-manager";

import * as th from "three";
import { toRadians } from "../../../kernel/core";
import { ModelManager } from "./model_manager";
import { ModelMaterialmanagement as ModelMaterialManager } from "./model-material-manager";

export class HSS_FacadeUnit {
  sm: SceneManager;

  private m: ModelManager | null = null;
  private mat: ModelMaterialManager;
  private lm: th.LoadingManager;

  constructor() {
    //set up scene
    this.sm = SceneManager.getInstance();
    this.setupScene();

    this.lm = new th.LoadingManager(() => {
      this.rotateAndAddModel();
    });

    this.mat = new ModelMaterialManager(this.lm);
  }

  private setupScene = () => {
    this.setupCamera();

    this.sm.scene.background = new th.Color("white");
    this.sm.grid.rotation.set(toRadians(90), 0, 0);
    this.sm.axesHelper.scale.set(100, 100, 100);

    this.sm.orbit.enableRotate = true;

    this.setupLights();
    this.setupCamera();
  };

  private setupCamera = () => {
    const perspectiveCamera = new th.PerspectiveCamera(
      50, // Field of view
      this.sm.canvasWidth / this.sm.canvasHeight, // Aspect ratio
      10, // Near clipping plane
      50000 // Far clipping plane
    );

    // Position the perspective camera to capture the model fully
    perspectiveCamera.position.set(0, 1700, 4000); // Position further out from the model

    // Set the OrbitControls to use the perspective camera
    this.sm.orbit.object = perspectiveCamera; // Set the new camera in OrbitControls
    this.sm.camera = perspectiveCamera;
    //this.sm.orbit.enabled = false;

    perspectiveCamera.updateProjectionMatrix();

    this.sm.orbit.target.set(0, 1700, 0);
    this.sm.orbit.update();

    // Set perspective camera as the main camera
    // Replace orthographic camera with perspective camera
  };

  private setupLights = () => {
    const ambientLight = new th.AmbientLight(0xffffff, 3); // Soft, even light
    this.sm.scene.add(ambientLight);

    const directionalLight = new th.DirectionalLight(0xffffff, 5); // Highlight model
    directionalLight.position.set(1500, 4500, 1000); // Position to cast light over the model
    directionalLight.target.position.set(0, 1500, 0);

    this.sm.scene.add(directionalLight);

    const dirHelper = new th.DirectionalLightHelper(
      directionalLight,
      1000,
      "black"
    );


    this.sm.scene.add(dirHelper);

    const pointLight = new th.PointLight(0xffffff, 30);
    pointLight.position.set(0, 1950, 200);
    const pointHelper = new th.PointLightHelper(pointLight, 500, "black");
    this.sm.scene.add(pointLight);
    this.sm.scene.add(pointHelper);
  };

  load = async () => {
    this.m = await ModelManager.getInstance("./rhino/hss_unit.3dm", this.lm);

    this.assignMaterialAndTextures();
  };

  private rotateAndAddModel = () => {
    if (this.m && this.m.model) {
      this.m.model.rotation.set(-toRadians(90), 0, 0);
      this.sm.scene.add(this.m!.model!);
    }
  };

  private assignMaterialAndTextures = () => {
    this.setFrameMaterials();
    this.setGlassPanelMaterial();
    this.setPanelMaterials();
    this.setLouversMaterial();
  };

  //set outerframe
  private setFrameMaterials = () => {
    const darkGraySteelMaterial = new th.MeshPhysicalMaterial({
      color: 0x1f1f1f, // Dark gray color for steel
      metalness: 0.9, // High metallic effect for steel appearance
      roughness: 0.4, // Moderate roughness for a slightly brushed look
      reflectivity: 0.7, // Reflective quality of steel
      clearcoat: 0.05, // Subtle clear coat for additional gloss and depth
      clearcoatRoughness: 0.2, // Adds a bit of roughness to the clear coat layer
    });

    this.mat.setMaterial("outerFrame", darkGraySteelMaterial);
    this.mat.setMaterial("glass_casing", darkGraySteelMaterial);
  };

  //set glass panel
  private setGlassPanelMaterial = () => {
    const glassMaterial = new th.MeshPhysicalMaterial({
      color: 0x88ccff, // Light blue color for the glass
      transparent: true,
      opacity: 0.5, // Adjust transparency
      roughness: 0.1, // Glass is usually smooth
      metalness: 0.0, // Glass is not metallic
      ior: 1.5, // Index of refraction for glass
      clearcoat: 1.0, // Optional: adds a clear coat layer
      clearcoatRoughness: 0.1, // Optional: roughness of the clear coat
    });

    this.mat.setMaterial("glass_left", glassMaterial);
    this.mat.setMaterial("glass_right", glassMaterial);
  };

  private setPanelMaterials = () => {
    const brassMaterial = new th.MeshPhysicalMaterial({
      color: 0xd4af37, // Gold-like color for brass
      roughness: 0.3, // Slightly rough to simulate brass
      metalness: 1.0, // Full metallic to resemble brass
      emissive: 0xffd700, // Optional: Add an emissive color if you want it to glow
      emissiveIntensity: 0.5,
    });
    this.mat.setMaterial("top_front_panel", brassMaterial);

    const darkAluminumMaterial = new th.MeshPhysicalMaterial({
      color: 0x2a2a2a, // Dark gray color
      metalness: 0.25, // Full metallic effect for aluminum
      roughness: 0.3, // Slight roughness for a brushed appearance
      reflectivity: 0.8, // Reflectivity to give it a polished look
      clearcoat: 0.1, // Adds a subtle clear coat for additional gloss
      clearcoatRoughness: 0.15, // Slight roughness on the clear coat layer
    });

    this.mat.setMaterial("front_center_panel", darkAluminumMaterial);
  };

  private setLouversMaterial = () => {
    const defaultPath = "./rhino/texture/Wood_027_SD";
    const woodTexture = this.mat.textureLoader.load(
      `${defaultPath}/Wood_027_basecolor.jpg`
    );
    const aoTexture = this.mat.textureLoader.load(
      `${defaultPath}/Wood_027_ambientOcclusion.jpg`
    );

    const normalTexture = this.mat.textureLoader.load(
      `${defaultPath}/Wood_027_normal.jpg`
    );
    const roughnessTexture = this.mat.textureLoader.load(
      `${defaultPath}/Wood_027_roughness.jpg`
    );
    woodTexture.colorSpace = th.SRGBColorSpace;

    const woodMaterial = new th.MeshPhysicalMaterial({
      map: woodTexture,
      aoMap: aoTexture,
      roughnessMap: roughnessTexture,
      normalMap: normalTexture,
      roughness: 0.5,
      metalness: 0.2,
    });

    // Optionally adjust the texture settings
    [woodTexture, aoTexture, normalTexture, roughnessTexture].forEach(
      (texture) => {
        texture.wrapS = th.RepeatWrapping;
        texture.wrapT = th.RepeatWrapping;
        texture.repeat.set(1, 4); // Adjust repetition as needed
      }
    );

    this.mat.setMaterial("vertical_louvers", woodMaterial);
  };
}
