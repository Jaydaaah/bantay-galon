import { Switch } from "@/components/ui/switch";
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

type ToastMessage = { type: "success" | "error"; message: string };

export default function Page2() {
    const [stock, setStock] = useState<string[]>([]);
    const [scanMode, setScanMode] = useState<"retrieve" | "release">(
        "retrieve"
    );
    const [scanTask, setScanTask] = useState<string[]>([]);
    const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

    const queueToast = (type: ToastMessage["type"], message: string) => {
        setToastMessage({ type, message });
    };

    const retrieveGalon = useCallback((serial: string) => {
        setStock((prev) => {
            if (!prev.includes(serial)) {
                console.log("set success");
                queueToast("success", `✨Galon Retrieved: ${serial}`);
                return [...prev, serial].sort();
            }
            queueToast("error", `Item is already retrieved: ${serial}`);
            return prev;
        });
    }, []);

    const releaseGalon = useCallback((serial: string) => {
        setStock((prev) => {
            if (prev.includes(serial)) {
                queueToast("success", `💫Galon Released: ${serial}`);
                return prev.filter((s) => s !== serial);
            }
            queueToast("error", `Item is already released: ${serial}`);
            return prev;
        });
    }, []);

    useEffect(() => {
        if (scanTask.length === 0) return;

        scanTask.forEach((serial) => {
            if (scanMode === "retrieve") {
                retrieveGalon(serial);
            } else {
                releaseGalon(serial);
            }
        });

        setScanTask([]);
    }, [scanTask, scanMode, retrieveGalon, releaseGalon]);

    useEffect(() => {
        if (!toastMessage) return;

        const { type, message } = toastMessage;
        type === "success" ? toast.success(message) : toast.error(message);

        // Clear toast message so new toasts can be queued later
        setToastMessage(null);
    }, [toastMessage]);

    const handleScan = useCallback((result: IDetectedBarcode[]) => {
        const validSerials = result
            .map(({ rawValue }) => rawValue)
            .filter((serial) => /^[A-Z]{3}-\d{4}$/.test(serial));

        if (validSerials.length > 0) {
            setScanTask((prev) => [...prev, ...validSerials]);
        }
    }, []);
    

    return (
        <div className="relative w-full h-full">
            {/* Scan mode toggle */}
            <div className="w-screen bottom-50 fixed z-50 flex gap-3 text-white justify-center">
                <span
                    className={
                        scanMode === "retrieve" ? "font-semibold" : "opacity-20"
                    }
                >
                    Retrieve
                </span>
                <Switch
                    checked={scanMode === "release"}
                    onCheckedChange={(checked) =>
                        setScanMode(checked ? "release" : "retrieve")
                    }
                />
                <span
                    className={
                        scanMode === "release" ? "font-semibold" : "opacity-20"
                    }
                >
                    Release
                </span>
            </div>

            {/* QR Scanner */}
            <Scanner formats={["data_matrix"]} onScan={handleScan} />

            {/* Stock display */}
            <div className="w-screen fixed left-2 bottom-30 text-white flex flex-col-reverse">
                <span className="text-xs break-words">{stock.join(", ")}</span>
                <span className="font-bold">On stock:</span>
            </div>
        </div>
    );
}
