"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="w-24 h-12 bg-red-600 hover:bg-red-500 transition-all ease-in-out text-c-white font-bold rounded-2xl"
      onClick={() => signOut()}
    >
      Log Out
    </button>
  );
}
