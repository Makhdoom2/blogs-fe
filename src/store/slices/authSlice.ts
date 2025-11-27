import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthState {
  token: string | null;
  user: User | null;
  expiresAt: number | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  expiresAt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User; expiresAt: number }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.expiresAt = action.payload.expiresAt;
      // console.log("TESTING");
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.user.role);
      localStorage.setItem("expiresAt", action.payload.expiresAt.toString());
      localStorage.setItem("userId", action.payload.user.id);
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.expiresAt = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("expiresAt");
      localStorage.removeItem("userId");
    },

    checkSession: (state) => {
      const expiresAt = localStorage.getItem("expiresAt");
      if (expiresAt && Number(expiresAt) * 1000 < Date.now()) {
        // session expired
        state.token = null;
        state.user = null;
        state.expiresAt = null;
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("expiresAt");
      }
    },
  },
});

export const { setCredentials, logout, checkSession } = authSlice.actions;
export default authSlice.reducer;
