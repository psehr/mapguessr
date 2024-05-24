"use client";

import React, { useState } from "react";
import { UserComplex, gameSorting } from "@/types";

import TableHead from "./TableHead";
import TableRows from "./TableRows";

export default function GameHistory(props: { userData: UserComplex }) {
  const [sortingOrder, setSortingOrder] = useState<gameSorting>({
    col: "date",
    order: "asc",
  });

  const colsWidth = {
    indexWidth: "w-[5%]",
    timeWidth: "w-[15%]",
    accWidth: "w-[15%]",
    ratingWidth: "w-[15%]",
    skipsWidth: "w-[10%]",
    cpmWidth: "w-[10%]",
    diffLevelWidth: "w-[10%]",
    dateWidth: "w-[20%]",
  };

  return props.userData.games ? (
    <div className="w-full h-full flex flex-row place-content-center items-center rounded-xl">
      <table className="flex flex-col w-full h-full m-auto text-c-white font-semibold rounded-xl">
        <thead className="w-full border-b-2 border-c-dark-blue bg-black/30 flex flex-col rounded-xl drop-shadow-lg mb-4">
          <TableHead
            setSorting={setSortingOrder}
            currSorting={sortingOrder}
            colsWidth={colsWidth}
          ></TableHead>
        </thead>
        <tbody className="flex flex-col overflow-y-auto scroll-smooth gap-1">
          <TableRows
            userData={props.userData}
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
