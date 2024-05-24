import { useState } from "react";
import Dot from "./Dot";
import NavButton from "./NavButton";
import NavLogo from "./NavLogo";
import { auth, signIn } from "@/auth";
import NavProfile from "./NavProfile";
import SignInButton from "./SignInButton";
import { getUser } from "@/lib/local_api";

export default async function Nav() {
  const session = await auth();
  const renderAdminButton = async () => {
    if (session) {
      const user = await getUser("username", session?.user?.name!);
      if (user) {
        if (user.role == "admin")
          return (
            <>
              <NavButton title={"ADMIN"} link={"admin"}></NavButton>
              <div className="my-auto">
                <Dot></Dot>
              </div>
            </>
          );
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-[15%] h-full flex flex-row place-content-left pl-4">
        <NavLogo></NavLogo>
      </div>
      <div className="w-[73%] h-full flex flex-row gap-8 place-content-center items-center">
        {renderAdminButton()}
        <NavButton title={"SPRINT"} link={"sprint"}></NavButton>
      </div>
      <div className="w-[12%] h-full flex flex-row place-content-center items-center">
        {session && session.user ? (
          <NavProfile session={session}></NavProfile>
        ) : (
          <SignInButton></SignInButton>
        )}
      </div>
    </div>
  );
}
