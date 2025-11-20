"use client";

import { useAppSelector } from "@/store/hooks";
import { WalletOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";
const WalletBox = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  return (
    <div className="rounded-2xl p-10 shadow-lg backdrop-blur-sm grid grid-rows-2 gap-2">
      <div className="flex items-center ">
        <WalletOutlined className="text-xl md:text-3xl mr-1" />
        <span className=" md:text-xl">
          Balance: {auth?.user?.wallet?.balance.toFixed(2)}{" "}
          {auth?.user?.wallet?.currency}
        </span>
      </div>
      <Button
        className=""
        type="primary"
        onClick={() => {
          router.push(`/wallet/topup`);
        }}
      >
        Top Up
      </Button>
    </div>
  );
};

export default WalletBox;
