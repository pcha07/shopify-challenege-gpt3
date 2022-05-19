import { atom } from "recoil";

// state to hold all results
export const resultItems = atom({
  key: "resultItems",
  default: JSON.parse(localStorage.getItem("allEntries")) || [],
});
