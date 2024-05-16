import { UserComplex } from "../../../../../types";
import {
  accuracy,
  joinDate,
  pb,
  playcount,
  rating,
} from "../../functions/utils";

export default function UserDetails(props: { userData: UserComplex }) {
  return (
    <div className="rounded-xl border-2 border-c-dark-blue m-auto bg-black/30 w-[70%] h-[50%] flex flex-col text-c-white font-medium text-xl">
      {/* Country flag */}
      <div className="w-full h-[30%] flex place-content-center items-center">
        <img
          src={`https://assets.ppy.sh/old-flags/${props.userData.user.country}.png`}
          alt="Country flag"
        />
      </div>
      {/* Join date and playcount */}
      <div className="w-full h-[20%] flex flex-col place-content-center items-center">
        <div className="flex flex-row gap-1">
          <p>Joined</p>
          <p>{joinDate(props.userData.user.created)}</p>
        </div>
        {props.userData.games.length ? (
          <p>
            {playcount(props.userData.games) + " "}
            game
            {playcount(props.userData.games) > 1 ? "s" : ""} played
          </p>
        ) : (
          ""
        )}
      </div>
      {/* Sprint PB and rank */}
      {props.userData.games.length ? (
        <div className="w-full h-[50%] flex flex-col place-content-center items-center">
          <div className="flex flex-row gap-1">
            <p className="underline font-bold">Sprint PB</p>
            <p className="font-bold">🏃</p>
          </div>
          <p className="text-green-400">{pb(props.userData.games)} ⏱️</p>
          <p className="text-yellow-400">
            {accuracy(props.userData.games[0])}% 🎯
          </p>
          <p className="text-blue-400">{rating(props.userData.games[0])} 🎮</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
