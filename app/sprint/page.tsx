import { auth } from "@/auth";
import Sprint from "./views/Sprint";

export default async function page() {
  const session = await auth();
  return session ? <Sprint session={session}></Sprint> : null;
}
