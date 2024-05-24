import React from "react";
import { SprintGameData } from "@/types";
import TableHead from "./TableHead";
import TableRows from "./TableRows";

export default function GameRecap(props: { sgd: SprintGameData }) {
  const colsWidth = {
    indexWidth: "w-[5%]",
    categoryWidth: "w-[20%]",
    guessWidth: "w-[30%]",
    distanceWidth: "w-[20%]",
    splitWidth: "w-[25%]",
  };
  return (
    <table className="flex flex-col place-content-center items-center w-full h-full m-auto text-c-white font-semibold rounded-xl">
      <thead className="w-full border-b-2 border-c-dark-blue bg-black/30 flex flex-col rounded-xl drop-shadow-lg mb-4">
        <TableHead colsWidth={colsWidth}></TableHead>
      </thead>
      <tbody className="w-full flex flex-col scroll-smooth gap-2">
        <TableRows colsWidth={colsWidth} data={props.sgd}></TableRows>
      </tbody>
    </table>
  );
}
