import { useEffect, useState } from "react";
import { skip } from "../../functions/game";
import { Chat, SprintGameData } from "@/types";
import { getDefaultSkips } from "@/lib/utils";

const skipSvg = (
  <div className="size-6 m-auto">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M2 18.3429L10.7429 12.1714L2 6V18.3429Z"
          fill="#ffffff"
        ></path>{" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 12.1714L11.2571 18.3429V6L20 12.1714ZM20 12.1714V6H22V18H20V12.1714Z"
          fill="#ffffff"
        ></path>{" "}
      </g>
    </svg>
  </div>
);

export default function SkipButton(props: {
  sgd: SprintGameData;
  updateData: any;
  chatData: Chat;
  updateChat: any;
}) {
  let [buttonText, setButtonText] = useState("");
  let [buttonColor, setButtonColor] = useState(
    "bg-yellow-600/40 hover:bg-yellow-600/60"
  );

  useEffect(() => {
    let currSkipsLeft = props.sgd.additionalBeatmaps.length;
    if (currSkipsLeft == getDefaultSkips(props.sgd.difficulty)) {
      setButtonColor("bg-green-600/40 hover:bg-green-600/60");
    } else if (currSkipsLeft <= 1) {
      setButtonColor("bg-red-600/40 hover:bg-red-600/60");
    } else if (currSkipsLeft > getDefaultSkips(props.sgd.difficulty) / 2) {
      setButtonColor("bg-yellow-600/40 hover:bg-yellow-600/60");
    }
  }, [props.sgd.skipsUsed]);

  return (
    <button
      className={`h-full w-24 px-8 rounded-2xl text-c-white text-2xl text-center font-bold transition-colors ease-in-out ${buttonColor}`}
      onClick={() => {
        if (props.sgd.additionalBeatmaps.length) {
          skip(props.sgd, props.updateData, props.chatData, props.updateChat);
        } else {
          const curr = buttonColor;
          setButtonColor("bg-red-600");
          setTimeout(() => {
            setButtonColor(curr);
          }, 500);
        }
      }}
    >
      {buttonText ? buttonText : skipSvg}
    </button>
  );
}
