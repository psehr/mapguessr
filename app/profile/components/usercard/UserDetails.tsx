import { getGameRank } from "@/lib/local_api";
import { UserComplex } from "@/types";
import {
  accuracy,
  gameTimeAgo,
  joinDate,
  pb,
  playcount,
  rating,
} from "../../functions/utils";
import { useEffect, useState } from "react";
import { capitalizeFirst } from "@/lib/utils";

export default function UserDetails(props: { userData: UserComplex }) {
  const [pbRank, setPbRank] = useState("?");
  useEffect(() => {
    if (props.userData.games.length) {
      getGameRank(
        props.userData.games[0].id,
        "sprint",
        props.userData.games[0].difficulty
      ).then((foundGameRank) => setPbRank(`#${foundGameRank.toString()}`));
    }
  }, []);
  return (
    <div className="flex flex-col rounded-xl w-[80%] h-fit text-c-white font-medium text-xl gap-2">
      {/* Join date and playcount */}
      <div className="text-gray-200 rounded-xl border-2 border-c-dark-blue p-4 gap-2 w-full h-fit flex flex-col place-content-center items-center bg-gradient-to-br from-c-darker-blue via-c-darker to-c-darker-blue">
        <div className="flex flex-row gap-1 p-2 bg-blue-500 rounded-xl place-content-center items-center">
          <p className="underline font-bold">User Stats</p>
          <p className="font-bold">🔬</p>
        </div>
        <div className="w-full h-fit">
          <div className="flex flex-row w-full gap-1 text-left ">
            <p>Joined</p>
            <p>{joinDate(props.userData.user.created)}</p>
          </div>
          {props.userData.games.length ? (
            <p className="flex flex-row w-full text-left">
              {playcount(props.userData.games) + " "}
              game
              {playcount(props.userData.games) > 1 ? "s" : ""} played
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* Sprint PB and rank */}
      {props.userData.games.length ? (
        <div className="w-full h-fit flex flex-col place-content-center items-center gap-1">
          <div className="w-full flex flex-col gap-4 rounded-xl border-2 border-c-dark-blue p-4 bg-gradient-to-br from-c-darker-blue via-c-darker to-c-darker-blue place-content-center items-center">
            <div className="w-fit flex flex-row gap-1 p-2 bg-green-600 rounded-xl place-content-center items-center">
              <p className="underline font-bold">
                {capitalizeFirst(props.userData.games[0].difficulty)} PB
              </p>
              <p className="font-bold">🏃</p>
            </div>
            <div className="flex flex-col w-full h-fit">
              <p className="text-blue-400">Rank {pbRank} 🌍</p>
              <p className="text-green-400">{pb(props.userData.games)} ⏱️</p>
              <p className="text-yellow-500">
                {accuracy(props.userData.games[0])}% 🎯
              </p>
              <p className="text-purple-400">
                Rated {rating(props.userData.games[0])} 🎮
              </p>
              <p className="text-gray-400">
                {gameTimeAgo(props.userData.games[0].endTime!)} 📅
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
