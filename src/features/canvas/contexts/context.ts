import { createContext } from "react";
import type CustomCanvas from "../models/CustomCanvas";

export const CustomCanvasContext = createContext<{
  customCanvas: CustomCanvas | null;
}>({
  customCanvas: null,
});
