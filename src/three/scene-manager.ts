import * as th from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";
import { Selection } from "./selection";
import { Constant } from "./constants";
import { toRadians } from "../kernel/core";
import { animateHTML, disposeHTML } from "./features/html";

class SceneManager {
  private static instance: SceneManager | null;

  public canvas: HTMLCanvasElement;
  public scene: th.Scene = new th.Scene();
  public camera: th.OrthographicCamera | th.PerspectiveCamera;
  public canvasWidth: number;
  public canvasHeight: number;
  public orbit: OrbitControls;
  public renderer: th.WebGLRenderer;
  public xFromControls: TransformControls;
  public grid: th.GridHelper;
  public axesHelper: th.AxesHelper;

  private frustumSize = 1000;

  // Private constructor to prevent direct instantiation
  private constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvasWidth = canvas.clientWidth;
    this.canvasHeight = canvas.clientHeight;

    this.scene.background = new th.Color("black");

    const aspect = this.canvasWidth / this.canvasHeight;

    this.camera = new th.OrthographicCamera(
      (this.frustumSize * aspect) / -2,
      (this.frustumSize * aspect) / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      0.001,
      1000
    );

    this.camera.position.set(0, 0, 15);
    this.camera.zoom = 60;

    //this.scene?.add(this.camera);

    this.camera.updateProjectionMatrix();

    this.orbit = new OrbitControls(this.camera, this.canvas);
    this.orbit.enableDamping = true;
    this.orbit.enableRotate = false;

    Constant.cPlane = new th.Plane(new th.Vector3(0, 0, 1));

    this.axesHelper = new th.AxesHelper(1);
    this.scene?.add(this.axesHelper);
    //add grid
    this.grid = new th.GridHelper(2, 5, 0x888888, 0x444444);
    this.grid.position.z = 0;
    this.grid.rotation.set(-toRadians(90), 0, 0);
    this.scene.add(this.grid);

    // Debug.gui.add(this.grid.scale, "x").min(1).max(10).step(0.01);

    this.renderer = new th.WebGLRenderer({ canvas, antialias: true });

    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(
      window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio
    );

    //transform controls
    this.xFromControls = new TransformControls(
      this.camera,
      this.renderer.domElement
    );

    const gizmo = this.xFromControls.getHelper();
    this.scene.add(gizmo);

    this.xFromControls.addEventListener("dragging-changed", (event) => {
      this.orbit.enabled = !event.value;
    });

    this.renderer.render(this.scene!, this.camera);

    this.scene.addEventListener("childadded", this.activateSelection);

    window.addEventListener("resize", this.onWindowResize);

    this.renderer.setAnimationLoop(this.tick);
  }

  private activateSelection = () => {
    Selection.activateSelection();

    this.scene.removeEventListener("childadded", this.activateSelection);
  };

  private onWindowResize = () => {
    this.canvas!.style.width = `${window.innerWidth}px`;
    this.canvas!.style.height = `${window.innerHeight}px`;

    this.canvasWidth = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.clientHeight;

    const aspect = this.canvasWidth / this.canvasHeight;
    if (this.camera instanceof th.OrthographicCamera) {
      this.camera.left = (this.frustumSize * aspect) / -2;
      this.camera.right = (this.frustumSize * aspect) / 2;
      this.camera.top = this.frustumSize / 2;
      this.camera.bottom = this.frustumSize / -2;
    } else {
      this.camera.aspect = aspect;
    }

    this.orbit.update();
    this.renderer?.setSize(this.canvasWidth, this.canvasHeight);
    this.renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  clock = new th.Clock();

  tick = () => {
    this.orbit.update();
    this.camera.updateProjectionMatrix();
    this.xFromControls.update(this.clock.getDelta());
    animateHTML();
    this.renderer.render(this.scene, this.camera);
  };

  // Static method to get or initialize the singleton instance
  public static getInstance(canvas?: HTMLCanvasElement): SceneManager {
    if (!SceneManager.instance) {
      if (!canvas) {
        throw new Error("SceneManager requires canvas to be initialized.");
      }
      SceneManager.instance = new SceneManager(canvas);
    }
    return SceneManager.instance;
  }

  public dispose(): void {
    if (SceneManager.instance) {
      this.orbit.dispose();

      this.renderer.dispose();

      window.removeEventListener("resize", this.onWindowResize);

      disposeHTML();
      Debug.Dispose();
      SceneManager.instance = null;
    }
  }
}

export default SceneManager;
