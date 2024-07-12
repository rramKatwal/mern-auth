import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "",
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    removeUser: (state, action) => {
      state.user = "";
      state.token = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
