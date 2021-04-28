import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginPayload, LoginResponse, User } from './type';

axios.defaults.withCredentials = true;

interface MyKnownError {
  message: string;
}

//로그인
export const loginAction = createAsyncThunk<
  LoginResponse, // 성공 시 리턴 타입
  LoginPayload, // 디스패치할때 넣을 인자
  { rejectValue: MyKnownError }
>('user/login', async (loginData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/local`,
      loginData
    );
    return data;
  } catch (e) {
    console.error(e);
    return rejectWithValue({ message: e.response.data });
  }
});

// 로그아웃
export const logOutAction = createAsyncThunk<
  unknown,
  null,
  { rejectValue: MyKnownError }
>('user/logout', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/logout`
    );
    return data;
  } catch (e) {
    console.error(e);
    return rejectWithValue({ message: e.message });
  }
});

// 로그인 인증
export const authAction = createAsyncThunk<User, null, { rejectValue: MyKnownError }>(
  'user/auth',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth`);
      return data;
    } catch (e) {
      console.error(e);
      return rejectWithValue({ message: e.response.data });
    }
  }
);
