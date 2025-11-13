"use client";
import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Image from "next/image";

const DefaultLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      <Layout.Header className="header">
        <Image src="/doccharge.png" alt="logo" width={100} height={100} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={[
            { key: "1", label: "Home" },
            { key: "2", label: "About" },
          ]}
        />
      </Layout.Header>
      <Layout.Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          {children}
        </div>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Layout.Footer>
    </Layout>
  );
};

export default DefaultLayout;
