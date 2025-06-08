import { useCallback, type PropsWithChildren } from "react";
import { useScreen } from "../hooks/useScreen";

interface TabProps {
    pageName: string;
}
export default function Tab({
    children,
    pageName,
}: PropsWithChildren & TabProps) {
    const { setPage } = useScreen();

    const onClick = useCallback(() => {
        setPage(pageName);
    }, [setPage, pageName]);

    return <button className="hover:bg-gray-500/10 active:bg-gray-500/20 p-2 rounded" onClick={onClick}>{children}</button>;
}
