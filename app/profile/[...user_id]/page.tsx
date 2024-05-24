import Profile from "../components/Profile";

export default function PublicProfile(params: { params: { user_id: string } }) {
  return <Profile user_id={params.params.user_id} scope="public"></Profile>;
}
