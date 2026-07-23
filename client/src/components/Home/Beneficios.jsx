import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDog,
  faPlateWheat,
  faDroplet,
  faAtom,
  faPlantWilt,
  faFlask,
} from "@fortawesome/free-solid-svg-icons";

export default function Beneficios() {
  return (
    <div className="bg-(--citronLight) h-100 w-full py-20 px-10 flex flex-col justify-center items-center gap-20">
      <h3 className="text-4xl text-(--citron) uppercase">
        <span className="font-bold">Nos preocupamos por</span> la salud de tu
        cabello
      </h3>
      <div className="h-full w-full text-6xl flex justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center gap-2">
          <img src="/Home/beneficts/noanimaltesting.png" className="h-30 hover:h-32" />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <img src="/Home/beneficts/colorsafe.png" className="h-30 hover:h-32" />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <img src="/Home/beneficts/glutenfree.png" className="h-30 hover:h-32" />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <img src="/Home/beneficts/sulfateysaltfree.png" className="h-30 hover:h-32" />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <img src="/Home/beneficts/vegan.png" className="h-30 hover:h-32" />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <img src="/Home/beneficts/parabenfree.png" className="h-30 hover:h-32" />
        </div>
      </div>
    </div>
  );
}
