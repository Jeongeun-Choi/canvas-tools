import { atom } from "jotai";

export const zoomScaleAtom = atom(1);
export const setZoomScaleAtom = atom(null, (_, set, update: number) =>
  set(zoomScaleAtom, update)
);
export const resetZoomScaleAtom = atom(null, (_, set) => {
  set(zoomScaleAtom, 1);
});
