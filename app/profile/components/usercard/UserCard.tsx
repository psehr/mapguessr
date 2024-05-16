import { Scope, UserComplex } from "../../../../../types";
import UserImage from "./UserImage";
import UserDetails from "./UserDetails";
import Buttons from "../buttons/Buttons";

export default function UserCard(props: {
  userData: UserComplex;
  scope: Scope;
}) {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Image group */}
      <UserImage userData={props.userData}></UserImage>
      {/* User stats group */}
      <UserDetails userData={props.userData}></UserDetails>
      {/* Buttons */}
      {/* <Buttons scope={props.scope}></Buttons> */}
    </div>
  );
}
