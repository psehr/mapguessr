import Dot from "./Dot";
import NavButton from "./NavButton";
import NavLogo from "./NavLogo";

export default async function Nav() {
  let logged = true;
  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-[15%] h-full flex flex-row place-content-center ml-[1%]">
        <NavLogo></NavLogo>
      </div>
      <div className="w-[60%] h-full flex flex-row space-x-8 place-content-center mx-auto">
        {/* <NavButton title={"CASUAL"} link={"casual"}></NavButton>
        <div className="my-auto">
          <Dot></Dot>
        </div> */}
        <NavButton title={"SPRINT"} link={"sprint"}></NavButton>
        {/* <div className="my-auto">
          <Dot></Dot>
        </div>
        <NavButton title={"MULTIPLAYER"} link={"multiplayer"}></NavButton> */}
      </div>
      <div className="w-[10%] h-full flex flex-row place-content-center">
        <NavButton
          title={logged ? "PROFILE" : "LOG IN"}
          link={logged ? "profile" : "login"}
        ></NavButton>
      </div>
    </div>
  );
}
