import { DifficultySettingsTypes, Scope, UserComplex } from "@/types";
import UserImage from "./UserImage";
import UserDetails from "./UserDetails";
import ProfileButtons from "../buttons/ProfileButtons";
import RefreshButton from "../buttons/RefreshButton";

export default function UserCard(props: {
  userData: UserComplex;
  scope: Scope;
  refreshData?: any;
  currentDiff: DifficultySettingsTypes;
}) {
  return (
    <div className="w-full h-full flex flex-col p-2 gap-4 rounded-xl place-content-center items-center">
      {/* Image group */}
      <div className="w-fit h-fit flex flex-col">
        <UserImage userData={props.userData}></UserImage>
      </div>

      {/* User stats group */}

      <div className="w-full h-fit flex flex-col place-content-center items-center">
        {props.currentDiff != "any" ? (
          <UserDetails userData={props.userData}></UserDetails>
        ) : (
          ""
        )}
      </div>

      {/* Buttons */}
      {props.scope == "private" ? (
        <div className="w-full h-fit flex flex-row gap-4 place-content-center items-center">
          <ProfileButtons></ProfileButtons>
          <RefreshButton refreshData={props.refreshData}></RefreshButton>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
