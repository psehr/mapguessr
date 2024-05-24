import { signIn } from "@/auth";

export default function SignInButton() {
  return (
    <div className="bg-c-dark-blue w-full h-full flex flex-row place-content-center items-center gap-2 font-bold text-xl text-c-white hover:bg-c-blue transition-all ease-in-out">
      <form
        action={async () => {
          "use server";
          await signIn("osu");
        }}
        className="w-full h-full"
      >
        <button type="submit" className="w-full h-full">
          Sign In
        </button>
      </form>
    </div>
  );
}
