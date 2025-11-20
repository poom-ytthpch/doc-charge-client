"use client";
import QrScanner from "@/components/charger/QrScaner";
import AppLayout from "@/components/layouts/AppLayout";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ChargePage = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.user) {
      router.push("/login");
    }
  }, [auth.user]);
  return (
    <AppLayout>
      <div className="flex flex-col items-center">
        Charge Page <QrScanner />
      </div>
    </AppLayout>
  );
};

export default ChargePage;
