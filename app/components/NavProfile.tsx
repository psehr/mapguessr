"use client";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function NavProfile(props: { session: Session }) {
  const router = useRouter();

  if (props.session.user) {
    return (
      <div
        className="bg-c-dark-blue w-full h-full flex flex-row place-content-center items-center gap-2 font-bold text-xl text-c-white cursor-pointer hover:bg-c-blue transition-all ease-in-out"
        onClick={() => router.push("/profile")}
      >
        <p className="w-fit h-1/2 text-left overflow-hidden">
          {props.session.user.name}
        </p>
        <img
          src={props.session.user.image!}
          className="size-8 rounded-lg"
          alt="user image"
        />
      </div>
    );
  }
}
