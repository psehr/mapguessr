import { auth } from "@/auth";
import Sprint from "./views/Sprint";
import Protected from "./views/Protected";

export default async function page() {
  const session = await auth();
  return session ? (
    <Sprint session={session}></Sprint>
  ) : (
    <Protected></Protected>
  );
}
