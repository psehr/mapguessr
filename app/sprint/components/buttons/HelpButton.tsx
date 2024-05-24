import { useState } from "react";

export default function HelpButton(props: { help: boolean; setHelp: any }) {
  const [buttonText, setButtonText] = useState("Help ℹ️");
  return (
    <button
      className={`w-40 h-12 p-2 px-8 rounded-lg text-center text-c-white text-2xl text-nowrap font-bold place-content-center bg-yellow-600/40 hover:bg-yellow-600/60 transition-all ease-in-out overflow-hidden`}
      onClick={() => {
        props.setHelp(!props.help);
        props.help ? setButtonText("Help ℹ️") : setButtonText("Back ⏪");
      }}
    >
      {buttonText}
    </button>
  );
}
