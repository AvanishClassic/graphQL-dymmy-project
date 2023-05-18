import { create } from "zustand";
import { FilterDataProps } from "../utils/type";

export const useFilterData = create<FilterDataProps>((set) => ({
  filterData: "",
  setFilterData: (value: string) => set(() => ({ filterData: value })),
}));
