import { UserComplex } from "@/types";

export default function UserImage(props: { userData: UserComplex }) {
  return (
    <div className="w-full h-full flex flex-col place-content-center items-center gap-2">
      <div className="relative size-40 rounded-xl border-2 border-c-dark-blue overflow-hidden">
        <img
          src="https://a.ppy.sh/9239673?1680647346.jpeg"
          alt=""
          className="absolute w-full h-full"
        />
        <div className="absolute size-40 bg-gradient-to-b from-transparent to-c-darker-blue/70"></div>
      </div>

      <div className="py-1 px-2 gap-1 flex flex-row place-content-center items-center w-fit h-fit text-c-white font-bold text-xl text-center bottom-1 rounded-xl border-2 border-c-dark-blue bg-gradient-to-br from-c-darker-blue via-c-darker to-c-darker-blue">
        <div className="w-fit h-8">pseh</div>
        {
          <img
            src={`https://assets.ppy.sh/old-flags/${props.userData.user.country}.png`}
            alt="Country flag"
            className="w-[15%]"
          />
        }
      </div>
    </div>
  );
}
