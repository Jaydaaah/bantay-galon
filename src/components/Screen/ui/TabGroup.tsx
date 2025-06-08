import type { PropsWithChildren } from "react";

export default function TabGroup({ children }: PropsWithChildren) {
    return (
        <div className="bottom-0 w-screen">
            <div className="backdrop-blur-md bg-white/80 shadow-xl border flex justify-around items-center px-4 py-2">
                {children}
            </div>
        </div>
    );
}
