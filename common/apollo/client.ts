import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext, SetContextLink } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

import { SubscriptionClient } from "subscriptions-transport-ws";
import * as cookies from "../actions";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const url = String(process.env.NEXT_PUBLIC_BASE_URL);
const isHttp = url.includes("http");

const token = async () => {
  return await cookies.get("accessToken");
};

const httpLink = new HttpLink({
  uri: (operation) => {
    return operation?.getContext()?.overrideApiUrl || url;
  },
  credentials: "same-origin",
});

const wsLink = new GraphQLWsLink(
  new SubscriptionClient(
    url.replace(isHttp ? "http" : "https", isHttp ? "ws" : "wss"),
    {
      reconnect: true,
      timeout: 30000,
      lazy: true,
      connectionParams: async () => {
        const accessToken = await token();
        return {
          authToken: accessToken ? `Bearer ${accessToken}` : "",
        };
      },
    }
  )
);

const authLink = new SetContextLink(async (prevContext, _) => {
  let accessToken = await cookies.get("token");

  if (!accessToken || accessToken === "") {
    accessToken =
      prevContext.headers?.authorization?.replace("Bearer ", "") || null;
  }

  return {
    headers: {
      ...prevContext.headers,
      authorization: accessToken ? `Bearer ${accessToken}` : ``,
    },
  };
});

const httpAuthLink = ApolloLink.from([authLink, httpLink]);

const link = ApolloLink.split(
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
