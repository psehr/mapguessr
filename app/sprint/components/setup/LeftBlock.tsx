import { getDefaultSkips } from "@/lib/utils";
import { Chat, DifficultySettingsTypes } from "@/types";
import DiffSelector from "./DiffSelector";
import SkipsAndMulti from "./SkipsAndMulti";

export default function LeftBlock(props: {
  setCurrentDiff: any;
  currentDiff: DifficultySettingsTypes;
  chatData: Chat;
  updateChat: any;
  currentMulti: number;
  setCurrentSkips: any;
  currentSkips: number;
  isGameStarting: boolean;
}) {
  const renderDiffDesc = () => {
    switch (props.currentDiff) {
      case "easy":
        return (
          <div className="w-[90%] h-full flex flex-col place-content-center items-center gap-2">
            <p className="font-semibold">Popular beatmaps</p>
            <p>Some chill.</p>
          </div>
        );

      case "normal":
        return (
          <div className="w-[90%] h-full flex flex-col place-content-center items-center gap-2 text-center">
            <p className="font-semibold">Base difficulty</p>
            <p>Average popularity with some harder and easier picks.</p>
          </div>
        );
      case "hard":
        return (
          <div className="w-[90%] h-full flex flex-col place-content-center items-center gap-2">
            <p className="font-semibold">Hard mode</p>
            <p>Harder maps for the best osu! background rats.</p>
          </div>
        );

      default:
        break;
    }
  };
  return (
    <div className="w-full h-full flex flex-col place-content-center items-center gap-4">
      <div className="w-full h-[60%] bg-black/20 rounded-xl flex flex-col place-content-start items-center base-container gap-2">
        <div className="w-full h-1/6 text-xl font-bold flex flex-row place-content-center items-center base-container">
          <p className="w-fit h-fit">Difficulty Selection</p>
        </div>
        <div className="w-full h-1/4">
          <DiffSelector
            currentDiff={props.currentDiff}
            setCurrentDiff={props.setCurrentDiff}
            chatData={props.chatData}
            updateChat={props.updateChat}
            currentMulti={props.currentMulti}
            setCurrentSkips={props.setCurrentSkips}
            currentSkips={props.currentSkips}
            isGameStarting={props.isGameStarting}
          ></DiffSelector>
        </div>
        <div className="w-full h-1/4 flex flex-col gap-2 place-content-center items-center">
          {renderDiffDesc()}
        </div>
        <div className="w-full h-1/4 flex flex-row place-content-center items-center gap-4">
          <SkipsAndMulti
            currentMulti={props.currentMulti}
            currentSkips={props.currentSkips}
            currentDiff={props.currentDiff}
            setCurrentSkips={props.setCurrentSkips}
            isGameStarting={props.isGameStarting}
          ></SkipsAndMulti>
        </div>
      </div>
    </div>
  );
}
