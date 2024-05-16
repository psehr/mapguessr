import { UserComplex } from "../../../../../types";

export default function UserImage(props: { userData: UserComplex }) {
  return (
    <div className="w-full h-[35%] flex flex-col">
      <div className="w-full h-full relative flex flex-col place-content-center items-center">
        <div className="relative size-48 rounded-xl border-2 border-c-dark-blue overflow-hidden">
          <img
            src="https://a.ppy.sh/9239673?1680647346.jpeg"
            alt=""
            className="absolute w-full h-full"
          />
          <div className="absolute size-48 bg-gradient-to-b from-transparent to-c-darker-blue/70"></div>
        </div>

        <div className="border-2 border-c-dark-blue bg-gradient-to-br from-c-darker-blue via-c-darker to-c-darker-blue py-2 px-6 w-fit h-fit absolute text-c-white font-bold text-xl text-center bottom-0 rounded-xl">
          {props.userData.user.username}
        </div>
      </div>
    </div>
  );
}
