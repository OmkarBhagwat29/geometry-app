import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";

import { FkSystem } from "./FkSystem";
import { Line2 } from "three/examples/jsm/Addons.js";

export const useFK = () => {
  const [links, setLinks] = useState<Line2[] | null>(null);

  let fkSys: FkSystem | null = null;

  useEffect(() => {
    fkSys = FkSystem.createDefault();

    // console.log(fkSys);
  }, []);

  useFrame(({ scene }) => {
    if (!fkSys) return;

    fkSys.wiggleSystem(scene);
  });

  setTimeout(() => {
    if (!fkSys) return;

    const lns: Line2[] = [];

    fkSys.links.forEach((link) => lns.push(...link.getAllRenderedLinks()));

    setLinks(lns);

    console.log("simulation stopped");
  }, 1000);

  return links;
};
