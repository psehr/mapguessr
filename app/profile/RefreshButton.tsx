"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function RefreshButton() {
  const router = useRouter();
  return (
    <form
      action={async () => {
        router.refresh();
      }}
    >
      <button
        type="submit"
        className="w-24 h-12 bg-yellow-600 text-c-white font-bold rounded-2xl"
      >
        Refresh
      </button>
    </form>
  );
}
