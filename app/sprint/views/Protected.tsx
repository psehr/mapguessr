import { signIn } from "@/auth";

export default function Protected() {
  return (
    <div className="w-full h-full flex flex-row justify-center items-center md:space-x-6 text-c-white font-bold">
      <div className="bg-c-dark-blue w-fit h-fit p-3 rounded-xl flex flex-row place-content-center items-center gap-2 font-bold text-xl text-c-white hover:bg-c-blue transition-all ease-in-out">
        <form
          action={async () => {
            "use server";
            await signIn("osu");
          }}
          className="w-full h-full"
        >
          <button type="submit" className="w-full h-full text-yellow-200">
            ⚠️ You need to be logged in to access this feature ⚠️
          </button>
        </form>
      </div>
    </div>
  );
}
