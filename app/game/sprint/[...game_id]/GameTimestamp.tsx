import { gameTimeAgo } from "@/app/profile/functions/utils";
import { SprintGameData } from "@/types";

export default function GameTimestamp(props: { sgd: SprintGameData }) {
  return (
    <div className="bg-blue-400/20 w-fit px-4 h-full flex flex-row place-content-center items-center text-2xl font-semibold text-c-white rounded-xl">
      <p>📅 {gameTimeAgo(props.sgd.endTime!)} 📅</p>
    </div>
  );
}
