"use client";

import { useState } from "react";
import { gameSorting } from "../../../../../types";

export default function TableHead(props: {
  setSorting: any;
  currSorting: gameSorting;
  colsWidth: any;
}) {
  const getAlternateSortingOrder = (currSorting: gameSorting) => {
    return currSorting.order == "asc" ? "desc" : "asc";
  };
  return (
    <tr className="h-12 w-full flex flex-row text-center select-none">
      <th
        className={`${props.colsWidth.indexWidth} my-auto border-r-2 border-c-dark-blue rounded-xl`}
      >
        #
      </th>
      <th
        className={`${
          props.colsWidth.timeWidth
        } my-auto border-r-2 border-c-dark-blue cursor-pointer ${
          props.currSorting.col == "time" ? "text-c-blue" : ""
        }`}
        onClick={() => {
          props.setSorting({
            col: "time",
            order: getAlternateSortingOrder(props.currSorting),
          } as gameSorting);
        }}
      >
        Time ⏱️
      </th>
      <th
        className={`${
          props.colsWidth.accWidth
        } my-auto border-r-2 border-c-dark-blue cursor-pointer ${
          props.currSorting.col == "acc" ? "text-c-blue" : ""
        }`}
        onClick={() => {
          props.setSorting({
            col: "acc",
            order: getAlternateSortingOrder(props.currSorting),
          } as gameSorting);
        }}
      >
        Accuracy 🎯
      </th>
      <th
        className={`${
          props.colsWidth.ratingWidth
        } my-auto border-r-2 border-c-dark-blue cursor-pointer ${
          props.currSorting.col == "rating" ? "text-c-blue" : ""
        }`}
        onClick={() => {
          props.setSorting({
            col: "rating",
            order: getAlternateSortingOrder(props.currSorting),
          } as gameSorting);
        }}
      >
        Rating 🎮
      </th>
      <th
        className={`${
          props.colsWidth.skipsWidth
        } my-auto border-r-2 border-c-dark-blue cursor-pointer ${
          props.currSorting.col == "skips" ? "text-c-blue" : ""
        }`}
        onClick={() => {
          props.setSorting({
            col: "skips",
            order: getAlternateSortingOrder(props.currSorting),
          } as gameSorting);
        }}
      >
        Skips 🏳️
      </th>
      <th
        className={`${
          props.colsWidth.cpmWidth
        } my-auto border-r-2 border-c-dark-blue cursor-pointer ${
          props.currSorting.col == "apm" ? "text-c-blue" : ""
        }`}
        onClick={() => {
          props.setSorting({
            col: "apm",
            order: getAlternateSortingOrder(props.currSorting),
          } as gameSorting);
        }}
      >
        CPM ⌨️
      </th>
      <th
        className={`${
          props.colsWidth.rankWidth
        } my-auto border-r-2 border-c-dark-blue cursor-pointer ${
          props.currSorting.col == "rank" ? "text-c-blue" : ""
        }`}
        onClick={() => {
          props.setSorting({
            col: "rank",
            order: getAlternateSortingOrder(props.currSorting),
          } as gameSorting);
        }}
      >
        Rank 🌍
      </th>
      <th
        className={`${props.colsWidth.dateWidth} my-auto cursor-pointer ${
          props.currSorting.col == "date" ? "text-c-blue" : ""
        }`}
        onClick={() => {
          props.setSorting({
            col: "date",
            order: getAlternateSortingOrder(props.currSorting),
          } as gameSorting);
        }}
      >
        Timestamp 📅
      </th>
    </tr>
  );
}
