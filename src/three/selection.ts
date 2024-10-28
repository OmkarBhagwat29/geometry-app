import { getCentroid, GetMouseCoordinates } from "./utils";
import { onSceneObjectClick } from "./raycaster";
import SceneManager from "./scene-manager";
import * as th from "three";
import { DrawableBase } from "./drawable/drawable-base";

import "../css/selection.css";
import { createHTMLFeature, disposeHTML } from "./features/html";

export class Selection {
  public static objects: th.Object3D[] = [];

  public static selectedObject: th.Object3D | null = null;

  private static sm: SceneManager;

  public static inCommandmode = false;

  static activateSelection = () => {
    this.sm = SceneManager.getInstance();
    window.addEventListener("click", this.onMouseClick);
    window.addEventListener("keydown", this.onKeyDown);
    this.sm.xFromControls.addEventListener(
      "dragging-changed",
      (e) => (this.sm.orbit.enabled = !e.value)
    );
  };

  static deactivateSelection = () => {
    window.removeEventListener("click", this.onMouseClick);
    window.removeEventListener("keydown", this.onKeyDown);
  };

  private static onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.selectObjects(null);
    } else if (event.key === "Delete") {
      if (this.selectedObject) {
        this.objects = this.objects.filter(
          (obj) => obj !== this.selectedObject
        );

        this.sm.xFromControls.detach();
        this.sm.scene?.remove(this.selectedObject);

        this.selectObjects(null);
        //this.sm.xFromControls.detach();
      }
    }
  };

  private static selectObjects = (object: th.Object3D | null) => {
    if (this.selectedObject) {
      this.selectedObject.material.color.set(
        this.selectedObject.userData.color
      );
    }
    this.selectedObject = object;
    if (this.selectedObject && object) {
      this.selectedObject.material.color.set("yellow");
    }
  };

  private static onMouseClick = (event: MouseEvent) => {
    if (this.objects.length == 0 || this.inCommandmode) return;

    const sm = SceneManager.getInstance();

    const mouse = GetMouseCoordinates(
      event.clientX,
      event.clientY,
      sm.canvasWidth,
      sm.canvasHeight
    );

    const clickedObj = onSceneObjectClick(mouse, sm.camera, this.objects);
    if (
      clickedObj instanceof th.Line ||
      clickedObj instanceof th.Points ||
      clickedObj instanceof th.Mesh
    ) {
      this.selectObjects(clickedObj);

      this.sm.xFromControls.attach(clickedObj);
    } else {
      this.selectObjects(null);

      sm.xFromControls.detach();
    }
  };

  static pickObject = (type: string, onPick: (obj: th.Object3D) => void) => {
    if (!this.sm) return;
    let sel: th.Object3D | null = null;

    const getObj = (event: MouseEvent) => {
      const mouse = GetMouseCoordinates(
        event.clientX,
        event.clientY,
        this.sm.canvasWidth,
        this.sm.canvasHeight
      );

      const clickedObj = onSceneObjectClick(
        mouse,
        this.sm.camera,
        this.objects
      );

      if (!clickedObj) return;

      if (clickedObj?.type === type) {
        sel = clickedObj;
        this.selectObjects(sel);
        setTimeout(() => {
          this.selectObjects(null);
        }, 150);
      }

      if (sel) {
        onPick(sel);
        window.removeEventListener("click", getObj);
        window.removeEventListener("keydown", onEscape);

        return;
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        window.removeEventListener("click", getObj);
        window.removeEventListener("keydown", onEscape);
        return;
      }
    };

    window.addEventListener("click", getObj);
    window.addEventListener("keydown", onEscape);
  };

  static boxSelection = (
    types: string[],
    onPick: (objs: th.Object3D[]) => void
  ) => {
    if (!this.sm) return;
    console.log("picking");
    // Create the selection overlay div
    // const overlay = document.createElement("div");
    // overlay.className = "selection-overlay";

    // document.body.appendChild(overlay);

    const overlay = createHTMLFeature("selection-overlay", "");

    let startPoint: { x: number; y: number } | null = null;
    let selectedObjects: th.Object3D[] = [];

    const onMouseDown = (event: MouseEvent) => {
      // Start selection area on mouse down
      startPoint = { x: event.clientX, y: event.clientY };
    };

    const canvasRect = this.sm.canvas.getBoundingClientRect(); // Get canvas position
    const updateOverlayPosition = (
      startX: number,
      startY: number,
      endX: number,
      endY: number
    ) => {
      const minX = Math.min(startX, endX);
      const minY = Math.min(startY, endY);
      const maxX = Math.max(startX, endX);
      const maxY = Math.max(startY, endY);

      // Update the overlay div with the new size and position
      overlay.style.left = `${minX}px`;
      overlay.style.top = `${minY}px`;
      overlay.style.width = `${maxX - minX}px`;
      overlay.style.height = `${maxY - minY}px`;
      overlay.style.display = "block"; // Show the overlay
    };

    const getObj = (event: MouseEvent) => {
      if (!startPoint) return;

      const endX = event.clientX;
      const endY = event.clientY;

      // Update overlay with current drag position
      updateOverlayPosition(startPoint.x, startPoint.y, endX, endY);

      // Calculate selection bounds (assuming mouse events are in screen space)
      const minX = Math.min(startPoint.x, endX);
      const minY = Math.min(startPoint.y, endY);
      const maxX = Math.max(startPoint.x, endX);
      const maxY = Math.max(startPoint.y, endY);

      // Check each object to see if it falls within the selection rectangle
      selectedObjects = []; // Reset selected objects
      for (const object of this.objects) {
        if (types.includes(object.type) || types.length == 0) {
          // Get object screen coordinates
          const center = getCentroid(object);
          if (!center) {
            continue;
          }
          const objectPos = center.clone().project(this.sm.camera);

          const objectScreenX =
            (objectPos.x * 0.5 + 0.5) * canvasRect.width + canvasRect.left;
          const objectScreenY =
            (-objectPos.y * 0.5 + 0.5) * canvasRect.height + canvasRect.top;

          // Check if object is inside the selection rectangle
          if (
            objectScreenX >= minX &&
            objectScreenX <= maxX &&
            objectScreenY >= minY &&
            objectScreenY <= maxY
          ) {
            selectedObjects.push(object);
            object.material.color.set("yellow");
          } else {
            selectedObjects = selectedObjects.filter((o) => o.id !== object.id);
            object.material.color.set(object.userData.color);
          }
        }
      }
    };

    const onMouseUp = () => {
      // Hide the overlay
      overlay.style.display = "none"; // Hide overlay
      startPoint = null;
      window.removeEventListener("mousemove", getObj);
      window.removeEventListener("mouseup", onMouseUp);
      disposeHTML(); // Clean up the overlay

      if (selectedObjects.length > 0) {
        onPick(selectedObjects);

        selectedObjects.forEach((o) => o.material.color.set(o.userData.color));
      }
    };

    // const onEscape = (event: KeyboardEvent) => {
    //   if (event.key === "Escape") {
    //     window.removeEventListener("mousemove", getObj);
    //     window.removeEventListener("keydown", onEscape);
    //     startPoint = null; // Reset selection area
    //     overlay.style.display = "none"; // Hide overlay
    //     document.body.removeChild(overlay); // Clean up the overlay
    //   }
    // };

    // Add event listeners
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", getObj);
    window.addEventListener("mouseup", onMouseUp);
    // window.addEventListener("keydown", onEscape);
  };
}
