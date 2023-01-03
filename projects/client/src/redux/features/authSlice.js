import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  username: "",
  email: "",
  RoleId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.RoleId = action.payload.RoleId;
    },
    logout: (state) => {
      state.id = 0;
      state.username = "";
      state.email = "";
      state.RoleId = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
