import { SprintGameData } from "../../../../../types";
import Timer from "../playfield/Timer";
import { preciseTimeFormat, timeFormat } from "../../functions/utils";

export default function FinalTime(props: { gameData: SprintGameData }) {
  return (
    <div className="w-full h-[12%] flex flex-col">
      <div className="flex flex-col gap-2 w-full h-full text-center content-center text-c-white font-bold text-2xl">
        Your time was
        <div className="w-40 h-12 flex flex-row mx-auto">
          <Timer
            time={preciseTimeFormat(
              props.gameData.endTime! - props.gameData.startTime!
            )}
            color="bg-green-600"
            textColor="text-c-white"
          ></Timer>
        </div>
      </div>
    </div>
  );
}
