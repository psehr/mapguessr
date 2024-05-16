"use client";

import { useState } from "react";
import { SprintGameData, gameSorting } from "../../../../../types";
import TableHead from "./TableHead";
import TableRows from "./TableRows";

export default function Table(props: { games: SprintGameData[] }) {
  const [sortingOrder, setSortingOrder] = useState<gameSorting>({
    col: "time",
    order: "asc",
  });

  const colsWidth = {
    indexWidth: "w-[5%]",
    timeWidth: "w-[13%]",
    accWidth: "w-[13%]",
    ratingWidth: "w-[13%]",
    skipsWidth: "w-[10%]",
    cpmWidth: "w-[10%]",
    playerWidth: "w-[21%]",
    dateWidth: "w-[15%]",
  };

  return props.games ? (
    <div className="w-full h-full flex flex-row place-content-center items-center rounded-xl">
      <table className="flex flex-col w-full h-full m-auto text-c-white font-semibold rounded-xl">
        <thead className="w-full border-b-2 border-c-dark-blue bg-black/30 flex flex-col rounded-xl drop-shadow-lg mb-4">
          <TableHead colsWidth={colsWidth}></TableHead>
        </thead>
        <tbody className="flex flex-col overflow-y-scroll scroll-smooth gap-1">
          <TableRows
            games={props.games}
            order={sortingOrder}
            colsWidth={colsWidth}
          ></TableRows>
        </tbody>
      </table>
    </div>
  ) : (
    ""
  );
}
