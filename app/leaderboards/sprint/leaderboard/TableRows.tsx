"use client";

import { ReactNode } from "react";
import { SprintGameData, gameSorting } from "../../../../../types";
import {
  accuracy,
  gameTimeAgo,
  isPB,
  rating,
  sortGames,
} from "@/app/profile/functions/utils";
import { preciseTimeFormat } from "@/app/sprint/functions/utils";
import { useRouter } from "next/navigation";

export default function TableRows(props: {
  games: SprintGameData[];
  order: gameSorting;
  colsWidth: any;
}) {
  const router = useRouter();
  const renderRows = (games: SprintGameData[], order: gameSorting) => {
    let rows: ReactNode[] = [];
    let sortedGames = sortGames(games, order);
    if (sortedGames.length > 0) {
      for (let index = 0; index < sortedGames.length; index++) {
        const game = sortedGames[index];
        rows.push(
          <tr
            className="h-8 w-full flex flex-row text-center border border-c-white/30 bg-black/20 rounded-xl drop-shadow-lg transition-all duration-75 hover:bg-c-dark-blue cursor-pointer select-none"
            onClick={() => {
              router.push(
                `/game/sprint/${game.id.split("#")[0]}_${game.id.split("#")[1]}`
              );
            }}
          >
            <td
              className={`${props.colsWidth.indexWidth} my-auto border-r-2 border-c-white/30 rounded-xl`}
            >
              {index + 1}
            </td>
            <td
              className={`${props.colsWidth.timeWidth} my-auto border-r-2 border-c-white/30`}
            >
              {preciseTimeFormat(game.finalTime!)}
              {isPB(game, props.games) ? "🏆" : ""}
            </td>
            <td
              className={`${props.colsWidth.accWidth} my-auto border-r-2 border-c-white/30`}
            >
              {accuracy(game)}%
            </td>
            <td
              className={`${props.colsWidth.ratingWidth} my-auto border-r-2 border-c-white/30`}
            >
              {rating(game)}
            </td>
            <td
              className={`${props.colsWidth.skipsWidth} my-auto border-r-2 border-c-white/30`}
            >
              {game.skipsUsed || "None"}
            </td>
            <td
              className={`${props.colsWidth.cpmWidth} my-auto border-r-2 border-c-white/30`}
            >
              {game.cpm || "?"}
            </td>
            <td
              className={`${props.colsWidth.playerWidth} my-auto border-r-2 border-c-white/30`}
            >
              {game.user ? (
                <div className="flex flex-row gap-2 place-content-center items-center">
                  <p>{game.user.username}</p>
                  <img
                    src={`https://assets.ppy.sh/old-flags/${game.user.country}.png`}
                    alt="Country flag"
                    className="w-[8%]"
                  />
                </div>
              ) : (
                "?"
              )}
            </td>
            <td className={`${props.colsWidth.dateWidth} my-auto`}>
              {gameTimeAgo(game.endTime!)}
            </td>
          </tr>
        );
      }
    } else {
      rows.push(
        <tr className="h-8 w-full flex flex-row text-center border border-c-white/30 bg-black/20 rounded-xl drop-shadow-lg select-none">
          <td className="my-auto w-full">Loading leaderboard.. ⌛</td>
        </tr>
      );
    }
    return rows;
  };
  return renderRows(props.games, props.order);
}
