"use client";
import { ReactNode, useEffect, useState } from "react";
import { GameBeatmap, SprintGameData } from "../../../../../types";
import SlimCover from "./SlimCover";

export default function GameProgress(props: { maps: GameBeatmap[] }) {
  const rendermaps = (maps: GameBeatmap[]) => {
    let mapNodes: ReactNode[] = [];
    maps.forEach((map) => {
      let borderColor, blurred, text, clickable;
      switch (map.status) {
        case "current":
          clickable = false;
          text = "?";
          borderColor = "yellow-400";
          blurred = false;
          break;
        case "found":
          clickable = true;
          text = map.metadata.artist + " - " + map.metadata.title;
          borderColor = "green-600";
          blurred = false;
          break;
        case "not found":
          clickable = false;
          text = "?";
          borderColor = "c-white";
          blurred = true;
          break;
      }
      mapNodes.push(
        <SlimCover
          url={map.metadata.slimcover}
          borderColor={borderColor}
          blurred={blurred}
          text={text}
          clickable={clickable}
          mapUrl={`https://osu.ppy.sh/beatmapsets/${map.metadata.id}`}
          key={map.metadata.artist + " - " + map.metadata.title}
        ></SlimCover>
      );
    });
    return mapNodes;
  };
  return (
    <div className="hidden md:flex flex-col w-[16%] h-[70%] bg-c-dark bg-opacity-30 justify-start items-center overflow-scroll snap-start py-2 rounded-2xl drop-shadow-lg">
      {rendermaps(props.maps)}
    </div>
  );
}
