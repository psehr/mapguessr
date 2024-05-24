import { ReactNode } from "react";
import { GameBeatmap, SprintGameData } from "@/types";
import React from "react";
import { formatFullTitle } from "@/lib/utils";
import { accuracy } from "@/app/profile/functions/utils";
import {
  formattedTimeSplit,
  preciseTimeFormat,
} from "@/app/sprint/functions/utils";

export default function TableRows(props: {
  colsWidth: any;
  data: SprintGameData;
}) {
  const formatCategory = (map: GameBeatmap) => {
    if (map.validGuessInfo?.type != "full") {
      return (
        map.validGuessInfo?.type.charAt(0).toUpperCase()! +
          map.validGuessInfo?.type.slice(1) || "?"
      );
    } else {
      return "Full Title";
    }
  };
  const renderRows = (sgd: SprintGameData) => {
    let rows: ReactNode[] = [];
    for (let index = 0; index < sgd.beatmaps.length; index++) {
      const map = sgd.beatmaps[index];

      const distance = map.guesses![map.guesses!.length - 1].validness;

      rows.push(
        <tr
          className={`h-8 w-full flex flex-row text-center border border-c-white/30 bg-black/20 rounded-xl drop-shadow-lg place-content-center items-center`}
          key={map.metadata.id}
        >
          <td
            className={`align-middle text-center border-r-2 border-c-white/30 rounded-xl ${props.colsWidth.indexWidth}`}
          >
            {index + 1}
          </td>
          <td
            className={`align-middle text-center text-nowrap overflow-hidden border-r-2 border-c-white/30 ${props.colsWidth.guessWidth}`}
          >
            {map.validGuess}
          </td>
          <td
            className={`align-middle text-center text-nowrap overflow-hidden border-r-2 border-c-white/30 ${props.colsWidth.categoryWidth}`}
          >
            {formatCategory(map)}
          </td>
          <td
            className={`align-middle text-center text-nowrap overflow-hidden border-r-2 border-c-white/30 ${props.colsWidth.distanceWidth}`}
          >
            {((1 / distance - 1) * 100).toFixed(1)}
          </td>

          <td
            className={`align-middle text-center text-nowrap overflow-hidden ${props.colsWidth.splitWidth}`}
          >
            {formattedTimeSplit(sgd)[index]}
          </td>
        </tr>
      );
    }

    return rows;
  };

  return renderRows(props.data);
}
