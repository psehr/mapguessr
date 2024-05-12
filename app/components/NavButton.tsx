"use client";

import { useRouter, usePathname } from "next/navigation";

export default function NavButton(props: { title: string; link: string }) {
  const router = useRouter();
  let color = usePathname().includes(props.title.toLowerCase())
    ? " text-[#00ADB5]"
    : " text-[#EEEEEE]";

  return (
    <div className={"my-auto text-center text-xl font-semibold" + color}>
      <button
        className="hover:text-[#00ADB5] transition ease-out"
        onClick={() => router.push("/" + props.link)}
      >
        {props.title}
      </button>
    </div>
  );
}
