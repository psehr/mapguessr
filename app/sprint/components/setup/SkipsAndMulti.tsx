import { getDefaultSkips } from "@/lib/utils";
import { DifficultySettingsTypes } from "@/types";

export default function SkipsAndMulti(props: {
  currentMulti: number;
  currentSkips: number;
  currentDiff: DifficultySettingsTypes;
  setCurrentSkips: any;
  isGameStarting: boolean;
}) {
  const canIncrementSkips = () => {
    return props.currentSkips < 9;
  };
  const canDecrementSkips = () => {
    return props.currentSkips > 0;
  };
  const renderSkips = () => {
    let borderColor = "";
    let bgColor = "";
    if (props.currentSkips == 0) {
      borderColor = "border-red-600/40";
      bgColor = "bg-red-700/40";
    } else if (props.currentSkips >= 5) {
      borderColor = "border-green-600/40";
      bgColor = "bg-green-700/40";
    } else if (props.currentSkips < 3) {
      borderColor = "border-orange-600/40";
      bgColor = "bg-orange-700/40";
    } else {
      borderColor = "border-yellow-600/40";
      bgColor = "bg-yellow-700/40";
    }

    return (
      <div
        className={`w-48 h-12 rounded-xl flex place-content-center items-center text-c-white text-lg font-semibold transition-all ease-in-out duration-300 border-2 overflow-hidden ${borderColor} ${bgColor} select-none`}
      >
        <div
          className={`w-1/4 h-full flex flex-row place-content-center items-center transition-all ease-in-out duration-300`}
        >
          <button
            className={`${
              canDecrementSkips() ? "flex" : "hidden"
            } place-content-center items-center w-full h-full bg-black/20 hover:bg-black/40`}
            disabled={props.isGameStarting}
            onClick={() => {
              canDecrementSkips()
                ? props.setCurrentSkips(props.currentSkips - 1)
                : null;
            }}
          >
            -
          </button>
        </div>
        <div className={`w-1/2 h-full`}>
          <div className="w-full h-full rounded-xl flex flex-row place-content-center items-center">
            {props.currentSkips ? props.currentSkips + " Skip" : "No skip"}
            {props.currentSkips > 1 ? "s" : ""}
          </div>
        </div>
        <div
          className={`w-1/4 h-full flex flex-row place-content-center items-center transition-all ease-in-out duration-300`}
        >
          <button
            className={`${
              canIncrementSkips() ? "flex" : "hidden"
            } place-content-center items-center w-full h-full bg-black/20 hover:bg-black/40`}
            disabled={props.isGameStarting}
            onClick={() => {
              canIncrementSkips()
                ? props.setCurrentSkips(props.currentSkips + 1)
                : null;
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  };
  const renderMultiplier = () => {
    let borderColor = "";
    let bgColor = "";
    if (props.currentMulti < 0.6) {
      borderColor = "border-red-600/40";
      bgColor = "bg-red-700/40";
    } else if (props.currentMulti > 1) {
      borderColor = "border-green-600/40";
      bgColor = "bg-green-700/40";
    } else if (props.currentMulti == 1) {
      borderColor = "border-yellow-600/40";
      bgColor = "bg-yellow-700/40";
    } else {
      borderColor = "border-orange-600/40";
      bgColor = "bg-orange-700/40";
    }

    return (
      <div
        className={`w-48 h-12 px-4 rounded-xl flex place-content-center items-center text-c-white text-lg font-semibold transition-all ease-in-out duration-300 border-2 ${borderColor} ${bgColor} select-none`}
      >
        Multiplier: x{props.currentMulti}
      </div>
    );
  };

  return (
    <>
      <div className="w-fit h-fit rounded-xl flex flex-row place-content-center">
        {renderSkips()}
      </div>
      <div className="w-fit h-fit rounded-xl flex flex-row place-content-center">
        {renderMultiplier()}
      </div>
    </>
  );
}
