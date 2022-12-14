import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  username: "",
  email: "",
  RoleId: "",
  branch_name: "",
  is_verified: "",
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
      state.branch_name = action.payload.branch_name;
      state.is_verified = action.payload.is_verified;
    },
    logout: (state) => {
      state.id = 0;
      state.username = "";
      state.email = "";
      state.RoleId = "";
      state.branch_name = "";
      state.is_verified = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
