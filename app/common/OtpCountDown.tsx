"use client";
import { useEffect, useState } from "react";
import { Button } from "antd";

export default function OtpCountdown({
  sec = 60,
  setActive,
}: {
  sec?: number;
  setActive?: (active: boolean) => void;
}) {
  const [seconds, setSeconds] = useState(sec);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    if (seconds <= 0) {
      setIsActive(false);
      setActive && setActive(false);
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    setActive && setActive(true);

    return () => clearInterval(timer);
  }, [isActive, seconds]);

  const startCountdown = () => {
    setSeconds(sec);
    setIsActive(true);
  };

  return (
    <div className="flex items-center gap-3">
      {isActive && seconds > 0 ? (
        <span className="text-gray-700 font-medium">
          ส่งใหม่ได้ใน {seconds}s
        </span>
      ) : (
        <Button type="primary" onClick={startCountdown}>
          ส่ง OTP ใหม่
        </Button>
      )}
    </div>
  );
}
