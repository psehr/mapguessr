"use client";

import { signIn } from "next-auth/react";

export default async function Protected() {
  return (
    <div className="w-full h-full flex flex-row justify-center items-center md:space-x-6 text-c-white font-bold">
      <div className="bg-c-dark-blue w-fit h-fit p-3 rounded-xl flex flex-row place-content-center items-center gap-2 font-bold text-xl text-c-white hover:bg-c-blue transition-all ease-in-out">
        <button
          className="w-full h-full text-c-white"
          onClick={() => signIn("osu")}
        >
          ⚠️ You need to be logged in to access this feature ⚠️
        </button>
      </div>
    </div>
  );
}
