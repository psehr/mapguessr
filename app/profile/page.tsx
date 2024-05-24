import { auth } from "@/auth";
import Profile from "./components/Profile";
import Protected from "../sprint/views/Protected";

export default async function page() {
  const session = await auth();
  if (session) {
    const user_id = session.user?.image?.split("/")[3].split("?")[0];
    return <Profile user_id={user_id!} scope="private"></Profile>;
  } else {
    return <Protected></Protected>;
  }
}
