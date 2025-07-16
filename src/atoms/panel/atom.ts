import { atom } from "jotai";

export const selectedPanelAtom = atom("");
export const setSelectedPanelAtom = atom(null, (_, set, update: string) =>
  set(selectedPanelAtom, update)
);
export const resetSelectedPanelAtom = atom(null, (_, set) => {
  set(selectedPanelAtom, "");
});
