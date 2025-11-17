import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../common/apollo/client";
import Cookies from "js-cookie";
import { LoginMutation } from "@/gql/auth";
import { LoginRequest, LoginResponse, MutationLoginArgs } from "@/types/gql";

export const login = createAsyncThunk(
  "auth/login",
  async ({ mobile, pin }: LoginRequest, thunkAPI) => {
    try {
      const res = await client.mutate<LoginResponse, MutationLoginArgs>({
        mutation: LoginMutation,
        variables: {
          input: {
            mobile,
            pin,
          },
        },
      });

      console.log({ res });

      if (!res.data?.status) {
        thunkAPI.rejectWithValue(res.data?.message);
      }

      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

interface AuthState {
  user: any;
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
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.data?.token) {
          state.token = payload.data?.token || null;
          Cookies.set("token", payload.data?.token);
        }
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
export const authReducer = authSlice.reducer;
