"use client";
import { Input, Space } from "antd";
import AppLayout from "../components/layouts/AppLayout";
import MobileRegisterForm from "../components/register/MobileRegisterForm";

const RegisterPage = () => {
  return (
    <AppLayout>
      <div className="flex flex-col items-center gap-6">
        <span className="text-4xl font-bold">Register</span>
        <MobileRegisterForm />
      </div>
    </AppLayout>
  );
};

export default RegisterPage;
