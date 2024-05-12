import { isValidGuess } from "@/lib/utils";
import { SprintGameData } from "../../../../../types";
import { findCurrent } from "../../functions/game";
import { useState } from "react";

export default function GuessInput(props: {
  onGuess: any;
  gameData: SprintGameData;
}) {
  const [borderColor, setBorderColor] = useState("border-transparent");
  const handleSubmit = (event: any) => {
    event.preventDefault();
    let guess = event.currentTarget.elements.userGuess.value;
    let valid = isValidGuess(guess, findCurrent(props.gameData), 0.7).valid;
    if (valid) {
      setBorderColor("border-green-600");
      setTimeout(() => {
        setBorderColor("border-transparent");
      }, 500);
    } else {
      setBorderColor("border-red-600");
      setTimeout(() => {
        setBorderColor("border-transparent");
      }, 500);
    }

    props.onGuess(guess);
    event.currentTarget.elements.userGuess.value = "";
  };
  return (
    <form action="" className="w-full h-full" onSubmit={handleSubmit}>
      <input
        name="userGuess"
        className={
          "drop-shadow-lg w-full h-full bg-c-white text-center text-2xl content-center rounded-full outline-none focus:placeholder-transparent transition-colors ease-out duration-300 border-4 " +
          borderColor
        }
        placeholder="Type your guess.."
        autoFocus
        autoComplete="off"
      ></input>
      <input type="submit" hidden />
    </form>
  );
}
