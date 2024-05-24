import React from "react";

export default function TableHead(props: { colsWidth: any }) {
  return (
    <tr className="h-12 w-full flex flex-row text-center select-none">
      <th
        className={`${props.colsWidth.indexWidth} my-auto border-r-2 border-c-dark-blue rounded-xl`}
      >
        #
      </th>

      <th
        className={`${props.colsWidth.guessWidth} my-auto border-r-2 border-c-dark-blue`}
      >
        Valid guess ✅
      </th>
      <th
        className={`${props.colsWidth.categoryWidth} my-auto border-r-2 border-c-dark-blue`}
      >
        Category 📚
      </th>
      <th
        className={`${props.colsWidth.distanceWidth} my-auto border-r-2 border-c-dark-blue`}
      >
        Distance 🔎
      </th>

      <th className={`${props.colsWidth.splitWidth} my-auto`}>Split ⏱️</th>
    </tr>
  );
}
