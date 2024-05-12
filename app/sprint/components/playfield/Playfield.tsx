import { useEffect, useState } from "react";
import { Chat, GameBeatmap, SprintGameData } from "../../../../../types";
import BeatmapCover from "./BeatmapCover";
import GuessInput from "./GuessInput";
import Timer from "./Timer";
import { findCurrent, guess } from "../../functions/game";
import { timeFormat } from "../../functions/utils";
import RetryButton from "../buttons/RetryButton";
import SkipButton from "../buttons/SkipButton";

export default function Playfield(props: {
  gameData: SprintGameData;
  updateData: any;
  updateView: any;
  chatData: Chat;
  updateChat: any;
  startGame: any;
}) {
  let [currentTime, setCurrentTime] = useState(
    Date.now() - props.gameData.startTime! || "0"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (props.gameData.startTime) {
        setCurrentTime(timeFormat(Date.now() - props.gameData.startTime));
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[90%] h-1/2 md:size-[57%] flex flex-col">
      {/* Upper playfield */}
      <div className="w-full h-1/4 flex flex-row justify-center items-center gap-8">
        <div className="w-max h-12">
          <RetryButton startGame={props.startGame}></RetryButton>
        </div>
        {/* Timer */}
        <div className="w-max h-12">
          <Timer
            time={currentTime.toString()}
            color="bg-c-white"
            textColor="text-c-dark"
          ></Timer>
        </div>
        <div className="w-max h-12">
          <SkipButton
            sgd={props.gameData}
            updateData={props.updateData}
            chatData={props.chatData}
            updateChat={props.updateChat}
          ></SkipButton>
        </div>
      </div>
      {/* Middle playfield */}
      <div className="w-full h-max">
        {/* Beatmap cover */}
        <BeatmapCover
          coverUrl={findCurrent(props.gameData).metadata.cover}
        ></BeatmapCover>
      </div>
      {/* Lower playfield */}
      <div className="relative w-full h-1/4 flex flex-row items-center">
        {/* Guess input */}
        <div className="w-[55%] h-12 mx-auto">
          <GuessInput
            onGuess={(g: string) =>
              guess(
                g,
                props.gameData,
                props.updateData,
                props.updateView,
                props.chatData,
                props.updateChat
              )
            }
            gameData={props.gameData}
          ></GuessInput>
        </div>
      </div>
    </div>
  );
}
