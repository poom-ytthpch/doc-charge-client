"use client";

import { Layout } from "antd";

import Image from "next/image";
import MenuList from "./Menu";

const { Sider } = Layout;

export default function Sidebar() {
  return (
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      className="fixed left-0 top-0 h-full bg-white shadow-lg z-40 hidden md:block"
      width={256}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b">
        <Image src="/docchargelogo.png" alt="logo" width={50} height={50} />
        <span className="text-lg font-bold text-primary">DocCharge</span>
      </div>

      <MenuList />
    </Sider>
  );
}
