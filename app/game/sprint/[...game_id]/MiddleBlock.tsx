import GameRecap from "@/app/components/Tables/GameRecap/GameRecap";
import { SprintGameData } from "@/types";
import GameResultsStats from "./GameResultsStats";
import GameTimestamp from "./GameTimestamp";

export default function MiddleBlock(props: { sgd: SprintGameData }) {
  return (
    <div className="w-full h-full flex flex-col place-content-center items-center gap-4">
      <div className="w-[90%] h-[20%] flex flex-col place-content-center items-center rounded-xl">
        <GameResultsStats sgd={props.sgd}></GameResultsStats>
      </div>
      <div className="w-[90%] h-[70%] flex flex-col place-content-center items-center rounded-xl">
        <GameRecap sgd={props.sgd}></GameRecap>
      </div>
      <div className="w-[90%] h-[10%] flex flex-col place-content-center items-center rounded-xl">
        <GameTimestamp sgd={props.sgd}></GameTimestamp>
      </div>
    </div>
  );
}
