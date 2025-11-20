"use client";
import AppLayout from "@/components/layouts/AppLayout";
import WalletBox from "@/components/wallet/WalletBox";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const WalletPage = () => {
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
        <WalletBox />
      </div>
    </AppLayout>
  );
};

export default WalletPage;
