import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

import { SubscriptionClient } from "subscriptions-transport-ws";
import * as cookies from "../actions";

const url = String(process.env.NEXT_PUBLIC_BASE_URL)
const isHttp = url.includes("http")

const token = async () => {
  return await cookies.get("accessToken");
};

const httpLink = new HttpLink({
  uri: (operation) => {
    return operation?.getContext()?.overrideApiUrl || url
  },
  credentials: 'same-origin',
})

const wsLink = new WebSocketLink(

  new SubscriptionClient(url.replace(isHttp ? "http" : "https", isHttp ? "ws" : "wss"), {
    reconnect: true,
    timeout: 30000,
    lazy: true,
    connectionParams: async () => {
      const accessToken = await token();
      return {
        authToken: accessToken ? `Bearer ${accessToken}` : "",
      };
    },

  })
);

// ใช้ setContext เพื่อปรับ Context เช่น Authorization header
const authLink = setContext((_, { headers }) => {
  const token = async () => {
    return await cookies.get("accessToken");
  };

  const context = token().then((accessToken) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  return context;
});

const httpAuthLink = ApolloLink.from([authLink, httpLink]);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpAuthLink
);

// สร้าง ApolloClient
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

export default client;
