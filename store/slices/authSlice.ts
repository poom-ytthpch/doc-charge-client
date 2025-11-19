import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../common/apollo/client";
import Cookies from "js-cookie";
import { LoginMutation } from "@/gql/auth";
import {
  GetBalanceByMobileResponse,
  GetBalanceByMobileResponseResolvers,
  LoginRequest,
  LoginResponse,
  MutationLoginArgs,
} from "@/types/gql";
import { showAlert } from "./alertSlice";
import { decode } from "jsonwebtoken";
import { GetBalanceQuery } from "@/gql/wallet";

export const login = createAsyncThunk(
  "auth/login",
  async ({ mobile, pin }: LoginRequest, thunkAPI) => {
    try {
      const res = await client.mutate<
        { login: LoginResponse },
        MutationLoginArgs
      >({
        mutation: LoginMutation,
        variables: {
          input: { mobile, pin },
        },
      });

      if (!res.data?.login.status) {
        thunkAPI.dispatch(
          showAlert({
            type: "error",
            message: res.data?.login.message || "Login failed",
          })
        );

        return thunkAPI.rejectWithValue(res.data?.login.message);
      }

      thunkAPI.dispatch(
        showAlert({
          type: "success",
          message: res.data?.login.message || "Login successful",
        })
      );

      const balance = await client.query<
        { getBalance: GetBalanceByMobileResponse },
        GetBalanceByMobileResponseResolvers
      >({
        query: GetBalanceQuery,
        fetchPolicy: "no-cache",
        context: {
          headers: {
            authorization: `Bearer ${res.data?.login.token}`,
          },
        },
      });

      if (balance.data?.getBalance.status === false) {
        return thunkAPI.rejectWithValue(balance.data?.getBalance.message);
      }
      return { ...res, wallet: balance.data?.getBalance };
    } catch (err: any) {
      thunkAPI.dispatch(
        showAlert({
          type: "error",
          message: err.message || "Something went wrong",
        })
      );

      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

interface Wallet {
  balance: number;
  currency: string;
}

interface User {
  mobile: string;
  wallet?: Wallet;
  roles: string[];
}

interface TokenPayload {
  userInfo: User;
}

interface DecodedToken {
  payload: TokenPayload;
  userInfo: User;
  iat: number;
  exp: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;

        console.log("Login Payload:", payload);

        if (payload.data?.login?.token) {
          const decodedToken = decode(payload.data.login.token) as DecodedToken;

          console.log("Decoded Token:", decodedToken);
          state.user = {
            mobile: decodedToken.payload.userInfo.mobile,
            roles: decodedToken.payload.userInfo.roles,
            wallet: {
              balance: payload.wallet?.data?.balance || 0,
              currency: payload.wallet?.data?.currency || "THB",
            },
          };
          state.token = payload.data.login.token;
          Cookies.set("token", payload.data.login.token);
        }
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
        state.token = null;
        Cookies.remove("token");
      });
  },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
