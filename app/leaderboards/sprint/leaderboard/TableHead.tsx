export default function TableHead(props: { colsWidth: any }) {
  return (
    <tr className="h-12 w-full flex flex-row text-center select-none">
      <th
        className={`${props.colsWidth.indexWidth} my-auto border-r-2 border-c-dark-blue rounded-xl`}
      >
        #
      </th>
      <th
        className={`${props.colsWidth.timeWidth} my-auto border-r-2 border-c-dark-blue`}
      >
        Time ⏱️
      </th>
      <th
        className={`${props.colsWidth.accWidth} my-auto border-r-2 border-c-dark-blue`}
      >
        Accuracy 🎯
      </th>
      <th
        className={`${props.colsWidth.ratingWidth} my-auto border-r-2 border-c-dark-blue`}
      >
        Rating 🎮
      </th>
      <th
        className={`${props.colsWidth.skipsWidth} my-auto border-r-2 border-c-dark-blue`}
      >
        Skips 🏳️
      </th>
      <th
        className={`${props.colsWidth.cpmWidth} my-auto border-r-2 border-c-dark-blue`}
      >
        CPM ⌨️
      </th>
      <th
        className={`${props.colsWidth.playerWidth} my-auto border-r-2 border-c-dark-blue`}
      >
        Player 🏃
      </th>
      <th className={`${props.colsWidth.dateWidth} my-auto`}>Timestamp 📅</th>
    </tr>
  );
}
