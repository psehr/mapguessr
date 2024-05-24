"use client";
import levenshtein from "damerau-levenshtein";
import { useRouter, usePathname } from "next/navigation";

export default function NavButton(props: { title: string; link: string }) {
  const router = useRouter();
  const distance = levenshtein(
    usePathname().split("/")[1],
    props.title.toLowerCase()
  ).similarity;
  let color = distance > 0.7 ? " text-[#00ADB5]" : " text-[#EEEEEE]";

  return (
    <div
      className={
        "w-fit h-fit my-auto text-center text-xl font-semibold" + color
      }
    >
      <button
        className="hover:text-[#00ADB5] transition ease-out"
        onClick={() => router.push("/" + props.link)}
      >
        {props.title}
      </button>
    </div>
  );
}
