import { signOut } from "@/auth";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="w-24 h-12 bg-red-600 text-c-white font-bold rounded-2xl"
      >
        Log Out
      </button>
    </form>
  );
}
