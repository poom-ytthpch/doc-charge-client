// src/components/ApolloWrapper.tsx
'use client';  // ทำให้ component นี้เป็น client component

import { ReactNode } from 'react';
import client from '../apollo/client';
import { ApolloProvider } from '@apollo/client/react';

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
