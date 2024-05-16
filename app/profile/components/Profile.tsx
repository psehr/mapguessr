"use client";

import { useEffect, useState } from "react";
import { UserComplex } from "../../../../types";
import GameHistory from "./gamehistory/GameHistory";
import UserCard from "./usercard/UserCard";
import { getUser, getUserSprint } from "@/lib/local_api";
import Loading from "@/app/sprint/views/Loading";

export default function Profile(props: { username: string }) {
  const [user, setUser] = useState<UserComplex>();

  useEffect(() => {
    getUser("username", props.username).then((foundUser) => {
      getUserSprint(props.username).then((foundGames) => {
        setUser({ games: foundGames, user: foundUser });
      });
    });
  }, []);

  if (user) {
    return (
      <div className="size-[90%] md:size-[71%] flex flex-row justify-center items-center m-auto gap-10">
        <div className="hidden w-[75%] h-full md:flex flex-col rounded-xl">
          <GameHistory userData={user}></GameHistory>
        </div>
        <div className="w-[80%] md:w-[25%] h-[90%] md:h-full rounded-xl">
          <UserCard userData={user} scope="private"></UserCard>
        </div>
      </div>
    );
  } else {
    return <Loading></Loading>;
  }
}
