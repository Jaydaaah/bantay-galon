import type { PropsWithChildren } from "react";
import { useScreen } from "../hooks/useScreen";

interface ScreenProps {
    pageName: string;
}
export default function Screen({
    children,
    pageName,
}: PropsWithChildren<ScreenProps>) {
    const { page } = useScreen();

    if (pageName == page) {
        return <div className="flex-grow-1">{children}</div>;
    }
}
