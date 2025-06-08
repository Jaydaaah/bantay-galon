import { useState } from "react";

export default function Page1() {
    const [status, setStatus] = useState<string>("");

    const requestCameraPermission = async () => {
        try {
            setStatus("Requesting camera permission...");
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            setStatus("✅ Camera permission granted!");
            // You can use `stream` to show video preview or pass it somewhere
            // For now, just stop all tracks so camera is freed immediately:
            stream.getTracks().forEach((track) => track.stop());
        } catch (err) {
            setStatus("❌ Camera permission denied or error.");
            console.error(err);
        }
    };

    return (
        <main className="max-w-sm mx-auto p-6 flex flex-col justify-center items-center text-center bg-gray-50 text-gray-800 font-sans">
            <h1 className="text-4xl font-bold mb-3 text-blue-700">
                Gallon Monitoring System
            </h1>
            <p className="text-lg mb-2 max-w-xs leading-relaxed">
                Welcome! Track your gallons efficiently and ensure seamless
                inventory management.
            </p>
            <p className="mb-8 max-w-xs text-xs text-red-600 font-semibold">
                ⚠️ This is a prototype app without a database. Data will NOT be
                saved persistently.
            </p>

            <button
                onClick={requestCameraPermission}
                aria-label="Start Gallon Monitoring"
                className="px-8 py-3 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
                Start Monitoring
            </button>

            {status && (
                <p className="mt-4 text-sm text-gray-700" role="alert">
                    {status}
                </p>
            )}
        </main>
    );
}
