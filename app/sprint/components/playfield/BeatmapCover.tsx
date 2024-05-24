import Image from "next/image";
import { ReactNode } from "react";

export default function BeatmapCover(props: { coverUrl: string }) {
  const imageLoader = () => {
    return props.coverUrl;
  };

  return (
    <div className="w-full h-full relative">
      <Image
        src={props.coverUrl}
        loader={imageLoader}
        alt="beatmap cover"
        className="rounded-2xl drop-shadow-lg bg-cover"
        fill={true}
        priority={true}
        sizes="(min-width: 66em) 33vw,
        (min-width: 44em) 50vw,
        100vw"
      ></Image>
      <div className="w-full h-full absolute top-0 left-0"></div>
    </div>
  );
}
