import { authApi } from "./authApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.getCurrentUser.matchPending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addMatcher(
        authApi.endpoints.getCurrentUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
          state.isLoggedIn = true;
          state.isFetchingCurrentUser = false;
        }
      )
      .addMatcher(authApi.endpoints.getCurrentUser.matchRejected, (state) => {
        state.isFetchingCurrentUser = false;
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
