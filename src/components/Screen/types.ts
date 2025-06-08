import type { Dispatch, SetStateAction } from "react";

export interface ScreenContextType {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
}
