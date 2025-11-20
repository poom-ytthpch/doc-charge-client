"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { Button } from "antd";

export default function QrScanner() {
  const [result, setResult] = useState<string>("");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const handleScan = (data: IDetectedBarcode[]) => {
    console.log("Scanned data:", data);
    data.forEach((code: IDetectedBarcode) => {
      console.log(`Format: ${code.format}, Value: ${code.rawValue}`);
      setResult(code.rawValue);
      setIsPaused(true);
    });
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="w-[300px] h-[300px] overflow-hidden rounded-xl shadow-md">
        <Scanner
          onScan={handleScan}
          onError={(error) => console.log(error)}
          components={{
            torch: true,
            zoom: true,
            finder: true,
          }}
          paused={isPaused}
        />
      </div>

      <Button onClick={() => setIsPaused(false)}>Try again</Button>

      <div className="p-2 rounded text-sm">Result: {result || "—"}</div>
    </div>
  );
}
