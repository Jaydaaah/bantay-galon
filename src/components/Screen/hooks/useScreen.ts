import { useContext } from "react";
import { ScreenContext } from "../context/ScreenContext";

export function useScreen() {
    const context = useContext(ScreenContext);
    if (!context || context == undefined) {
        throw new Error("cant't find the ScreenProvider");
    }
    return context;
}
