"use client";

import { useEffect, useState } from "react";
import { DifficultySettingsTypes, Scope, UserComplex } from "@/types";
import GameHistory from "../../components/Tables/GameHistory/GameHistory";
import UserCard from "./usercard/UserCard";
import { getUser, getUserSprint } from "@/lib/local_api";
import Loading from "@/app/sprint/views/Loading";
import { Session } from "next-auth";
import ErrorPage from "next/error";

export default function Profile(props: { user_id: string; scope: Scope }) {
  const [user, setUser] = useState<UserComplex>();
  const [valid, setValid] = useState<boolean>(true);
  const [refresh, setRefresh] = useState(false);
  const [diffLevel, setDiffLevel] = useState<DifficultySettingsTypes>("any");
  const [isLoading, setIsLoading] = useState(false);
  const refreshData = () => {
    setRefresh(!refresh);
  };

  const updateDiffLevel = (newDiff: DifficultySettingsTypes) => {
    newDiff == diffLevel ? setDiffLevel("any") : setDiffLevel(newDiff);
  };

  let spin = (
    <svg
      aria-hidden="true"
      className="size-12 text-gray-200 animate-spin fill-c-dark mx-auto"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );

  useEffect(() => {
    setIsLoading(true);
    getUser("id", props.user_id)
      .then((foundUser) => {
        getUserSprint(foundUser.username, diffLevel).then((foundGames) => {
          setIsLoading(false);
          setValid(true);
          setUser({ user: foundUser, games: foundGames });
        });
      })
      .catch(() => {
        setValid(false);
      });
  }, [refresh]);

  if (user && valid) {
    return (
      <div className="size-[90%] md:size-[80%] flex flex-row justify-center items-center m-auto gap-10">
        <div className="w-[65%] h-full flex flex-col place-content-center items-center">
          <div className="hidden w-full h-[15%] md:flex flex-row rounded-xl text-c-white font-semibold place-content-center items-center gap-4">
            <button
              className={`w-28 h-12 font-bold bg-green-600 border-2 border-green-500 flex place-content-center items-center rounded-xl hover:opacity-100 transition-all ease-in-out ${
                diffLevel != "easy" ? "opacity-50" : null
              }`}
              onClick={() => {
                updateDiffLevel("easy");
                refreshData();
              }}
            >
              Easy 👍
            </button>
            <button
              className={`w-28 h-12 font-bold bg-yellow-600 border-2 border-yellow-500 flex place-content-center items-center rounded-xl hover:opacity-100 transition-all ease-in-out ${
                diffLevel != "normal" ? "opacity-50" : null
              }`}
              onClick={() => {
                updateDiffLevel("normal");
                refreshData();
              }}
            >
              Normal 👌
            </button>
            <button
              className={`w-28 h-12 font-bold bg-red-600 border-2 border-red-500 flex place-content-center items-center rounded-xl hover:opacity-100 transition-all ease-in-out ${
                diffLevel != "hard" ? "opacity-50" : null
              }`}
              onClick={() => {
                updateDiffLevel("hard");
                refreshData();
              }}
            >
              Hard 🤘
            </button>
          </div>
          <div className="hidden w-full h-[80%] md:flex flex-col rounded-xl place-content-center items-center">
            {isLoading ? spin : <GameHistory userData={user}></GameHistory>}
          </div>
        </div>
        <div className="w-[80%] md:w-[20%] h-[90%] md:h-full rounded-xl">
          <UserCard
            userData={user}
            scope={props.scope}
            refreshData={refreshData}
            currentDiff={diffLevel}
          ></UserCard>
        </div>
      </div>
    );
  } else if (valid) {
    return <Loading></Loading>;
  } else {
    return <ErrorPage statusCode={404}></ErrorPage>;
  }
}
