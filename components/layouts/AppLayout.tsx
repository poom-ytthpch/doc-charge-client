"use client";

import { Layout } from "antd";
import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";
import ApolloWrapper from "@/common/apollo/wrapper";
import Providers from "@/common/providers";

const { Content, Footer } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <Layout className="h-screen bg-gray-50">
        <Sidebar />

        <Layout className="transition-all duration-300 ">
          <HeaderBar />

          <Content className="m-4 p-6 bg-white rounded-2xl shadow-sm min-h-[calc(100vh-120px)]">
            <Providers>{children}</Providers>
          </Content>

          <Footer className="text-center text-gray-500 py-4">
            © {new Date().getFullYear()} DocCharge — EV Charging Platform
          </Footer>
        </Layout>
      </Layout>
    </ApolloWrapper>
  );
}
