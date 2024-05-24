import { useRouter } from "next/navigation";

export default function LbButton() {
  const router = useRouter();
  return (
    <button
      className={`w-50 h-12 p-2 px-8 rounded-lg text-center text-c-white text-2xl text-nowrap font-bold place-content-center bg-blue-400/40 hover:bg-blue-400/60 transition-all ease-in-out overflow-hidden`}
      onClick={() => {
        router.push("/leaderboards/sprint");
      }}
    >
      Rankings 🌍
    </button>
  );
}
