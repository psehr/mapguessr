"use client";

import ExitButton from "../components/buttons/ExitButton";

export default function ErrorPage(props: {
  status: number;
  statusDesc: string;
  desc: string;
  updateView: any;
}) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 text-c-white font-bold">
      <div className="bg-red-500 w-fit h-fit p-3 rounded-xl flex flex-col place-content-center items-center gap-2 font-bold text-2xl">
        <p>{props.desc}</p>
        <p>
          {"Status Code: " + props.status.toString() + ` ${props.statusDesc}`}
        </p>
      </div>
      <div>{<ExitButton updateView={props.updateView}></ExitButton>}</div>
    </div>
  );
}
