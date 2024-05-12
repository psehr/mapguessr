import { useState } from "react";
import { SprintGameData } from "../../../../../types";
import Timer from "../playfield/Timer";
import ResultsButtons from "./ResultsButtons";
import FinalTime from "./FinalTime";
import SplitsTable from "./SplitsTable";

export default function ResultsBlock(props: {
  gameData: SprintGameData;
  updateView: any;
  startGame: any;
}) {
  return (
    <div className="flex flex-col w-[75%] md:w-[57%] h-[80%] bg-c-dark bg-opacity-50 justify-around items-center rounded-2xl drop-shadow-lg">
      <FinalTime gameData={props.gameData}></FinalTime>
      <SplitsTable gameData={props.gameData}></SplitsTable>
      <ResultsButtons
        startGame={props.startGame}
        updateView={props.updateView}
      ></ResultsButtons>
    </div>
  );
}
