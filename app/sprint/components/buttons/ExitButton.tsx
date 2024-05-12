import { useState } from "react";

const exitSvg = (
  <div className="size-8 m-auto">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M14 7.63636L14 4.5C14 4.22386 13.7761 4 13.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 19.5C4 19.7761 4.22386 20 4.5 20L13.5 20C13.7761 20 14 19.7761 14 19.5L14 16.3636"
          stroke="#ffffff"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />{" "}
        <path
          d="M10 12L21 12M21 12L18.0004 8.5M21 12L18 15.5"
          stroke="#ffffff"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />{" "}
      </g>
    </svg>
  </div>
);

export default function ExitButton(props: { updateView: any }) {
  let [buttonText, setButtonText] = useState("");
  let [buttonColor, setButtonColor] = useState("bg-red-600");
  return (
    <button
      className={`h-full w-24 px-8 rounded-2xl text-c-white text-2xl text-center font-bold transition-colors ease-in-out duration-700 ${buttonColor}`}
      onClick={() => {
        props.updateView("setup");
      }}
    >
      {buttonText ? buttonText : exitSvg}
    </button>
  );
}
