"use client";

import { Menu } from "antd";
import {
  HomeOutlined,
  ThunderboltOutlined,
  WalletOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
const MenuList = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const menuItems = [
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
      key: "wallet",
      icon: <WalletOutlined />,
      label: auth.user
        ? `Wallet ( ${auth.user?.wallet?.balance.toFixed(2) ?? 0} ${
            auth.user?.wallet?.currency ?? ""
          })`
        : "Wallet",
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
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  const handleClick = (e: { key: string }) => {
    if (e.key === "home") {
      router.push(`/`);
      return;
    }
    if (e.key === "logout") {
      dispatch(logout());
      router.push(`/`);
      return;
    }
    router.push(`/${e.key}`);
  };

  return (
    <Menu
      mode="inline"
      onClick={handleClick}
      items={menuItems.map((item) => {
        if (auth.token && (item.key === "login" || item.key === "register")) {
          return null;
        } else {
          if (!auth.token && item.key === "logout") {
            return null;
          }
          return item;
        }
      })}
    />
  );
};

export default MenuList;
