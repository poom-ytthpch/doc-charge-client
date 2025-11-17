"use client";

import { Menu } from "antd";
import {
  HomeOutlined,
  ThunderboltOutlined,
  WalletOutlined,
  UserAddOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const MenuList = () => {
  const router = useRouter();

  const handleClick = (e: { key: string }) => {
    if (e.key === "home") {
      router.push(`/`);
      return;
    }
    router.push(`/${e.key}`);
  };

  return (
    <Menu
      mode="inline"
      onClick={handleClick}
      items={[
        {
          key: "home",
          icon: <HomeOutlined />,
          label: "Home",
        },
        {
          key: "charge",
          icon: <ThunderboltOutlined />,
          label: "Charge",
        },
        {
          key: "billing",
          icon: <WalletOutlined />,
          label: "Billing",
        },
        {
          key: "register",
          icon: <UserAddOutlined />,
          label: "Register",
        },
        {
          key: "login",
          icon: <LoginOutlined />,
          label: "Login",
        },
      ]}
    />
  );
};

export default MenuList;
