"use client";

import { Alert, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAlert } from "@/store/slices/alertSlice";
import { useEffect } from "react";

export default function GlobalAlert() {
  const dispatch = useAppDispatch();
  const { type, message } = useAppSelector((state) => state.alert);

  useEffect(() => {
    if (type && message && type !== "loading") {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [type, message, dispatch]);

  if (!type || !message) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      {type === "loading" ? (
        <Spin tip="Loading...">
          <Alert type="info" message={message} />
        </Spin>
      ) : (
        <Alert
          message={message}
          type={type}
          showIcon
          closable
          onClose={() => dispatch(clearAlert())}
        />
      )}
    </div>
  );
}
