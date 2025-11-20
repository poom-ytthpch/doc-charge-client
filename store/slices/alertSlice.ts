import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AlertType = "success" | "info" | "warning" | "error" | "loading";

interface AlertState {
  type: AlertType | null;
  message: string | null;
  loading: boolean;
}

const initialState: AlertState = {
  type: null,
  message: null,
  loading: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{ type: AlertType; message: string }>
    ) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearAlert: (state) => {
      state.type = null;
      state.message = null;
    },
  },
  extraReducers: () => {},
});

export const { showAlert, clearAlert } = alertSlice.actions;

export const alertReducer = alertSlice.reducer;
