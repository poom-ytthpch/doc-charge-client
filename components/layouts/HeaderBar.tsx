"use client";

import { useState } from "react";
import { Layout, Button, Drawer, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Image from "next/image";
import MenuList from "./Menu";

const { Header } = Layout;

export default function HeaderBar() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <div className="flex items-center justify-between bg-white px-6 py-2 shadow-sm sticky top-0 z-50 md:hidden">
        <div className="flex items-center gap-2">
          <Image
            src="/docchargelogo.png"
            alt="DocCharge Logo"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        <Button
          type="text"
          icon={<MenuOutlined className="text-2xl text-gray-700" />}
          onClick={showDrawer}
          className="hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
        />
      </div>

      <Drawer title="Menu" placement="right" onClose={onClose} open={open}>
        <MenuList />
      </Drawer>
    </>
  );
}
