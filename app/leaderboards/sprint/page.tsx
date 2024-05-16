"use client";

import { useEffect, useState } from "react";
import { SprintGameData } from "../../../../types";
import TestButton from "./TestButton";
import Table from "./leaderboard/Table";
import { getLeaderboards } from "@/lib/local_api";

export default function LeaderboardsSprint() {
  const [games, setGames] = useState<SprintGameData[]>([]);

  const updateGames = (games: SprintGameData[]) => {
    let temp = [...games];
    setGames(temp);
  };

  useEffect(() => {
    getLeaderboards("sprint").then((gamesList) => {
      updateGames(gamesList);
    });
  }, []);

  return (
    <div className="h-[90%] w-[90%] md:h-[71%] md:w-[90%] flex flex-row justify-center items-center m-auto gap-10">
      <div className="w-[65%] h-full flex flex-col rounded-xl">
        <Table games={games}></Table>
      </div>
    </div>
  );
}
