"use client";

import { Alert } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAlert } from "@/store/slices/alertSlice";

export default function GlobalAlert() {
  const dispatch = useAppDispatch();
  const { type, message } = useAppSelector((state) => state.alert);

  if (!type || !message) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <Alert
        message={message}
        type={type}
        showIcon
        closable
        onClose={() => dispatch(clearAlert())}
      />
    </div>
  );
}
