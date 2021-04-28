import { createSlice } from '@reduxjs/toolkit';
import { authAction, loginAction, logOutAction } from './thunk';
import { UserState } from './type';

// 초기 상태
const initialState: UserState = {
  login: { loading: false, data: null, error: null },
  auth: { loading: false, data: null, error: null },
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginAction.pending, state => {
        state.login.loading = true;
        state.login.data = null;
        state.login.error = null;
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.login.loading = false;
        state.login.data = payload;
        state.login.error = null;
        state.userData = payload;
      })
      .addCase(loginAction.rejected, (state, { payload }) => {
        state.login.loading = false;
        state.login.data = null;
        state.login.error = payload;
      })
      .addCase(authAction.pending, state => {
        state.auth.loading = true;
        state.auth.data = null;
        state.auth.error = null;
      })
      .addCase(authAction.fulfilled, (state, { payload }) => {
        state.auth.loading = false;
        state.auth.data = payload;
        state.auth.error = null;
        state.userData = payload;
      })
      .addCase(authAction.rejected, (state, { payload }) => {
        state.auth.loading = false;
        state.auth.data = null;
        state.auth.error = payload;
        state.userData = null;
      })
      .addCase(logOutAction.pending, state => {
        state.login.loading = true;
        state.login.data = null;
        state.login.error = null;
      })
      .addCase(logOutAction.fulfilled, (state, { payload }) => {
        state.login.loading = false;
        state.login.data = payload;
        state.login.error = null;
        state.userData = null;
      })
      .addCase(logOutAction.rejected, (state, { payload }) => {
        state.login.loading = false;
        state.login.data = null;
        state.login.error = payload;
      });
  },
});

export default userSlice.reducer;