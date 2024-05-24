"use client";

import { ReactNode, useState } from "react";
import { SprintGameData, UserComplex, gameSorting } from "@/types";
import {
  accuracy,
  gameTimeAgo,
  isPB,
  sortGames,
} from "../../../profile/functions/utils";
import { preciseTimeFormat } from "../../../sprint/functions/utils";
import { useRouter } from "next/navigation";
import { capitalizeFirst, diffColor } from "@/lib/utils";

export default function TableRows(props: {
  userData: UserComplex;
  order: gameSorting;
  colsWidth: any;
}) {
  const router = useRouter();
  const renderRows = (games: SprintGameData[], order: gameSorting) => {
    let rows: ReactNode[] = [];
    let sortedGames = sortGames(games, order);
    if (sortedGames.length > 0) {
      for (let index = 0; index < sortedGames.length; index++) {
        let curr = sortedGames[index];
        rows.push(
          <tr
            className={`h-8 w-full flex flex-row text-center border border-c-white/30 bg-black/20 ${
              isPB(curr, props.userData.games) ? "bg-green-600/30" : ""
            } rounded-xl drop-shadow-lg transition-all duration-75 hover:bg-c-dark-blue cursor-pointer select-none`}
            onClick={() => {
              router.push(
                `/game/sprint/${curr.id.split("#")[0]}_${curr.id.split("#")[1]}`
              );
            }}
            key={curr.id}
          >
            <td
              className={`my-auto border-r-2 border-c-white/30 rounded-xl ${props.colsWidth.indexWidth}`}
            >
              {index + 1}
            </td>
            <td
              className={`my-auto border-r-2 border-c-white/30 ${props.colsWidth.timeWidth}`}
            >
              {preciseTimeFormat(curr.finalTime!)}{" "}
              {isPB(curr, props.userData.games) ? "🏆" : ""}
            </td>
            <td
              className={`my-auto border-r-2 border-c-white/30 ${props.colsWidth.accWidth}`}
            >
              {accuracy(curr)}%
            </td>
            <td
              className={`my-auto border-r-2 border-c-white/30 ${props.colsWidth.ratingWidth}`}
            >
              {curr.rating ? curr.rating.toFixed() : "?"}
            </td>
            <td
              className={`my-auto border-r-2 border-c-white/30 ${props.colsWidth.skipsWidth}`}
            >
              {curr.skipsUsed || "None"}
            </td>
            <td
              className={`my-auto border-r-2 border-c-white/30 ${props.colsWidth.cpmWidth}`}
            >
              {curr.cpm || "?"}
            </td>
            <td
              className={`my-auto border-r-2 border-c-white/30 ${
                props.colsWidth.diffLevelWidth
              } ${diffColor(curr.difficulty)}`}
            >
              {capitalizeFirst(curr.difficulty) || "?"}
            </td>
            <td
              className={`my-auto ${props.colsWidth.dateWidth}`}
              title={new Date(curr.endTime!).toUTCString()}
            >
              {gameTimeAgo(curr.endTime!)}
            </td>
          </tr>
        );
      }
    } else {
      rows.push(
        <tr
          className="h-8 w-full flex flex-row text-center border border-c-white/30 bg-black/20 rounded-xl drop-shadow-lg transition-all duration-75 hover:bg-c-dark-blue cursor-pointer select-none"
          onClick={() => {
            router.push("/sprint");
          }}
        >
          <td className="my-auto w-full">No game played yet.. 😓</td>
        </tr>
      );
    }
    return rows;
  };
  return renderRows(props.userData.games, props.order);
}
