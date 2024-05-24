import { auth } from "@/auth";
import { getLeaderboards } from "@/lib/local_api";

export default async function TestButton() {
  const session = await auth();
  if (session) {
    return (
      <form
        action={async () => {
          "use server";
          // let games = await getLeaderboards("sprint");
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
