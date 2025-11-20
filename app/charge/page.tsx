"use client";
import QrScanner from "@/components/charger/QrScaner";
import AppLayout from "@/components/layouts/AppLayout";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ChargePage = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const [refId, setRefId] = useState("");
  useEffect(() => {
    if (!auth.user) {
      router.push("/login");
    }
  }, [auth.user]);

  const handleRefIdChange = (newRefId: string) => {
    setRefId(newRefId);
  };

  return (
    <AppLayout>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold">Scan QR Code Or Input RefID</span>{" "}
        <QrScanner handleRefIdChange={handleRefIdChange} refId={refId} />
      </div>
    </AppLayout>
  );
};

export default ChargePage;
