export default function SlimCover(props: {
  url: string;
  borderColor: string;
  blurred: boolean;
  text: string;
  clickable: boolean;
  mapUrl: string;
  index: number;
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
        <div className="z-20 absolute w-full h-full text-c-white font-bold text-right pr-4 content-center text-nowrap transition-all ease-in-out duration-500">
          {props.text}
        </div>
        <div
          className={`z-20 left-0 absolute h-full w-16 p-4 rounded-l-full bg-black/50 text-c-white
          } font-bold flex place-content-center items-center text-lg border-r-2 border-gray-400/50 `}
        >
          #{props.index}
        </div>
        <div
          className={`z-10 absolute w-full h-full ${
            "bg-" + props.borderColor
          } bg-opacity-5`}
        ></div>
        <div className="z-0 absolute w-full h-full bg-black opacity-50"></div>
      </div>
    </div>
  );
}
