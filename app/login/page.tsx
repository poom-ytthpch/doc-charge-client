"use client";
import { Input, Space } from "antd";
import AppLayout from "../../components/layouts/AppLayout";
import MobileRegisterForm from "../../components/register/MobileRegisterForm";

const LoginPage = () => {
  return (
    <AppLayout>
      <div className="flex flex-col items-center gap-6 ">
        <span className="text-4xl font-bold">Login</span>
        <MobileRegisterForm isLogin={true} />
      </div>
    </AppLayout>
  );
};

export default LoginPage;
