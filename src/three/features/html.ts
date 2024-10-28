import { Vector3 } from "three";
import "../../css/features.css";
import "../../css/selection.css";

import SceneManager from "../scene-manager";

type LabelData = {
  element: HTMLDivElement;
  point: Vector3 | undefined;
};

const labels: LabelData[] = [];

export const createHTMLFeature = (
  className: string,
  innerHTML: string,
  point?: Vector3
) => {
  const label = document.createElement("div");
  label.className = className;
  label.innerHTML = innerHTML;

  if (point) {
    const { camera, canvasWidth, canvasHeight } = SceneManager.getInstance();

    const sPt = point.clone().project(camera);

    // Convert normalized device coordinates (NDC) to screen space
    const x = (sPt.x * 0.5 + 0.5) * canvasWidth;
    const y = -(sPt.y * 0.5 - 0.5) * canvasHeight;

    label.style.left = `${x}px`;
    label.style.top = `${y}px`;
  }

  document.body.appendChild(label);

  labels.push({ element: label, point });

  return label;
};

const updatePosition = () => {
  const { camera, canvasWidth, canvasHeight } = SceneManager.getInstance();

  labels.forEach(({ element, point }) => {
    if (point) {
      const sPt = point.clone().project(camera);

      // Convert NDC to screen space
      const x = (sPt.x * 0.5 + 0.5) * canvasWidth;
      const y = -(sPt.y * 0.5 - 0.5) * canvasHeight;

      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
    }
  });
};

export const animateHTML = () => {
  updatePosition();
};

export const disposeHTML = () => {
  labels.forEach(({ element }) => {
    // Remove each label's HTML element from the DOM
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });

  // Clear the labels array
  labels.length = 0; // Set the length of the array to 0 to empty it
};
