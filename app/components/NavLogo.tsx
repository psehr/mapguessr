"use client";

import { useRouter } from "next/navigation";

export default function NavLogo() {
  let router = useRouter();
  return (
    <button
      className="bg-gradient-to-br from-c-dark-blue to-c-darker border-2 border-c-dark-blue my-auto text-center text-3xl font-bold text-c-white px-2 py-1 rounded-xl"
      onClick={() => router.push("/")}
    >
      MAPGUESSR
    </button>
  );
}
