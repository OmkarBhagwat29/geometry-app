import React, { useState } from "react";
import { CADItemsProvider, CADType } from "../../context";
import CadUiWrap from "./CadUiWrap";
import { Object3D } from "three";

const CADApp = () => {
  const [command, setCommand] = useState<CADType>(null);

  const [objects, setObjects] = useState<Object3D[]>([]);

  const runCommand = (command: CADType) => {
    console.log("command sent to", command);
    setCommand(command);

    if (command) {
      //preposess
    } else {
      //post process
    }
  };

  const addObject = (obj: Object3D) => {
    setObjects((prv) => [...prv, obj]);
    console.log(objects);
    setCommand(null);
  };

  return (
    <CADItemsProvider value={{ objects, addObject, command, runCommand }}>
      <CadUiWrap />
    </CADItemsProvider>
  );
};

export default CADApp;
