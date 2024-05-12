export default function BeatmapCover(props: { coverUrl: string }) {
  return (
    <div className="w-full h-full relative">
      <img
        src={props.coverUrl}
        alt="beatmap cover"
        className="w-max h-max rounded-2xl drop-shadow-lg"
      />
      <div className="w-full h-full absolute top-0 left-0"></div>
    </div>
  );
}
