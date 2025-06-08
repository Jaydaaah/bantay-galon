import { createContext } from "react";
import type { ScreenContextType } from "../types";

export const ScreenContext = createContext<ScreenContextType | undefined>(
    undefined
);
