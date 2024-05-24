import { ReactNode } from "react";
import { SprintGameData } from "@/types";
import { preciseTimeFormat } from "../../../sprint/functions/utils";
import React from "react";

export default function SplitsTable(props: { gameData: SprintGameData }) {
  const renderRows = () => {
    let rows: ReactNode[] = [];
    for (let index = 0; index < props.gameData.beatmaps.length; index++) {
      const beatmap = props.gameData.beatmaps[index];
      let splitDuration;
      index == 0
        ? (splitDuration = preciseTimeFormat(
            beatmap.splitTime - props.gameData.startTime!
          ))
        : (splitDuration = preciseTimeFormat(
            beatmap.splitTime - props.gameData.beatmaps[index - 1].splitTime
          ));
      rows.push(
        <tr
          className={`font-bold flex flex-row w-full text-center py-3 px-2 ${
            index % 2 == 0 ? "bg-c-dark-blue" : "bg-c-darker-blue"
          } ${index == 9 ? "rounded-b-xl" : ""}`}
          key={beatmap.metadata.title}
        >
          <td className="w-[4%] font-bold">{index + 1}</td>
          <td className="w-[55%] text-left text-nowrap overflow-x-auto">
            <a href={`https://osu.ppy.sh/beatmapsets/${beatmap.metadata.id}`}>
              {beatmap.metadata.artist} - {beatmap.metadata.title} (
              {beatmap.metadata.creator})
            </a>
          </td>
          <td className="w-[20%] text-left">{beatmap.validGuess}</td>
          <td
            className={`w-[10%] ${
              beatmap.accuracy! > 0.9 ? "text-green-400" : "text-yellow-300"
            }`}
          >
            {(beatmap.accuracy! * 100).toFixed()}%
          </td>
          <td className="w-[10%]">+{splitDuration}</td>
        </tr>
      );
    }
    return rows;
  };
  return (
    <div className="w-[90%] h-[70%] flex flex-row text-c-white overflow-scroll rounded-xl scroll-smooth">
      <table className="flex flex-col table-auto w-full h-full">
        <thead className="flex flex-row w-full h-fit">
          <tr className="flex flex-row w-full p-2 bg-c-darker-blue border-c-dark border-b-4 border-separate rounded-t-xl font-bold sticky">
            <th className="w-[4%]">#</th>
            <th className="w-[55%] text-left">Full Answer</th>
            <th className="w-[20%] text-left">Your guess</th>
            <th className="w-[10%]">Accuracy</th>
            <th className="w-[10%]">Time</th>
          </tr>
        </thead>
        <tbody className="flex flex-col w-full">{renderRows()}</tbody>
      </table>
    </div>
  );
}
