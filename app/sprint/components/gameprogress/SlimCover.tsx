export default function SlimCover(props: {
  url: string;
  borderColor: string;
  blurred: boolean;
  text: string;
  clickable: boolean;
  mapUrl: string;
}) {
  return (
    <div
      className={`w-[90%] h-8 mx-1 my-2 flex-grow overflow-hidden rounded-full border-2 drop-shadow-lg transition-colors ease-in-out duration-300 ${
        "border-" + props.borderColor
      } ${props.clickable ? "cursor-pointer" : ""}`}
      onClick={() => {
        props.clickable ? window.open(props.mapUrl) : "";
      }}
    >
      <div className="w-full h-full relative">
        <img
          src={props.url}
          alt="beatmap slimcover"
          className={`absolute w-full h-full object-cover rounded-full ${
            props.blurred ? "blur-md" : "blur-0"
          }`}
        />
        <div className="z-10 absolute w-full h-full text-c-white font-bold text-center content-center text-nowrap transition-all ease-in-out duration-500">
          {props.text}
        </div>
        <div className="absolute w-full h-full bg-black opacity-50"></div>
      </div>
    </div>
  );
}
