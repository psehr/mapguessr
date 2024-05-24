"use client";
import { ReactNode, useEffect, useState } from "react";
import { GameBeatmap, SprintGameData } from "@/types";
import SlimCover from "./SlimCover";
import { formatFullTitle, formatTitle } from "../../../../lib/utils";

export default function GameProgress(props: { maps: GameBeatmap[] }) {
  const rendermaps = (maps: GameBeatmap[]) => {
    let mapNodes: ReactNode[] = [];
    for (let index = 0; index < maps.length; index++) {
      const map = maps[index];
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
          text = formatTitle(formatTitle(map.metadata.title, 40, 4), 20, 2);
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
          index={index + 1}
          key={map.metadata.artist + " - " + map.metadata.title}
        ></SlimCover>
      );
    }

    return mapNodes;
  };
  return rendermaps(props.maps);
}
