import { useEffect, useState } from "react";
import { SprintGameData } from "@/types";
import { getDefaultSkips } from "@/lib/utils";

export default function SkipLabel(props: { sgd: SprintGameData }) {
  const [color, setColor] = useState("bg-green-600/40");

  useEffect(() => {
    let currSkipsLeft = props.sgd.additionalBeatmaps.length;
    if (currSkipsLeft == getDefaultSkips(props.sgd.difficulty)) {
      setColor("bg-green-600/40");
    } else if (currSkipsLeft <= 1) {
      setColor("bg-red-600/40");
    } else if (currSkipsLeft > getDefaultSkips(props.sgd.difficulty) / 2) {
      setColor("bg-yellow-600/40");
    }
  }, [props.sgd.skipsUsed]);

  return (
    <div
      className={`h-full w-24 flex px-8 rounded-2xl text-c-white text-2xl place-content-center items-center text-center font-bold transition-colors ease-in-out duration-200 ${color} select-none`}
    >
      {props.sgd.additionalBeatmaps.length}
    </div>
  );
}
