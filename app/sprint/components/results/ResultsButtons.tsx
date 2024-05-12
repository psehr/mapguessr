import { useState } from "react";
import RetryButton from "../buttons/RetryButton";
import ExitButton from "../buttons/ExitButton";

export default function ResultsButtons(props: {
  updateView: any;
  startGame: any;
}) {
  let [buttonText, setButtonText] = useState("Retry");
  let [buttonColor, setButtonColor] = useState("bg-green-600");
  return (
    <div className="w-full h-[10%] flex flex-row justify-center items-center gap-4">
      <div className="w-max h-12">
        <ExitButton updateView={props.updateView}></ExitButton>
      </div>
      <div className="w-max h-12">
        <RetryButton startGame={props.startGame}></RetryButton>
      </div>
    </div>
  );
}
