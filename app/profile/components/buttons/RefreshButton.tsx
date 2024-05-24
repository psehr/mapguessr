"use client";

export default function RefreshButton(props: { refreshData: any }) {
  return (
    <button
      className="w-24 h-12 bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out text-c-white font-bold rounded-2xl"
      onClick={() => props.refreshData()}
    >
      Refresh
    </button>
  );
}
