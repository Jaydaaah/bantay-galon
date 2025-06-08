import { useState, type PropsWithChildren } from "react";
import { ScreenContext } from "../context/ScreenContext";
import type { ScreenContextType } from "../types";

export default function ScreenProvider({ children }: PropsWithChildren) {
    const [page, setPage] = useState("page-1");


    const context: ScreenContextType = {
        page,
        setPage,
    };
    return (
        <ScreenContext.Provider value={context}>
            {children}
        </ScreenContext.Provider>
    );
}
