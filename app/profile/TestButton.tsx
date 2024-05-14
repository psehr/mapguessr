import { auth } from "@/auth";
import { getUserSprint, postSprint } from "@/lib/local_api";

export default async function TestButton() {
  const session = await auth();
  if (session) {
    return (
      <form
        action={async () => {
          "use server";
          let games = await getUserSprint(session.user?.name!);
        }}
      >
        <button
          type="submit"
          className="w-24 h-12 bg-yellow-600 text-c-white font-bold rounded-2xl"
        >
          Test Button
        </button>
      </form>
    );
  }
}
