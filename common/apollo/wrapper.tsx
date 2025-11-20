"use client";

import { ReactNode } from "react";
import client from "../apollo/client";
import { ApolloProvider } from "@apollo/client/react";

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
