import { createContext } from "react";

import type CustomCanvas from "./CustomCanvas";

export const CustomCanvasContext = createContext<{
  customCanvas: CustomCanvas | null;
}>({
  customCanvas: null,
});
