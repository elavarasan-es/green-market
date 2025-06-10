import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../Store';

interface RefreshToken {
  access_token: string;
  id_token: string;
  refresh_token: string;
}

interface AuthState {
  authenticated: boolean;
  userNumber: string;
  accessToken: string;
  idToken: string;
  refreshToken: RefreshToken;
}

interface InitialState {
  auths: AuthState;
}

const initialState: InitialState = {
  auths: {
    authenticated: false,
    userNumber: '',
    accessToken: '',
    idToken: '',
    refreshToken: {
      access_token: '',
      id_token: '',
      refresh_token: '',
    },
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAuth: (state, action) => {
      state.auths.authenticated = action.payload;
    },
    getUserData: (state, action) => {
      state.auths.userNumber = action.payload;
    },
    getUserAccessToken: (state, action) => {
      state.auths.accessToken = action.payload;
    },
    getUserIdToken: (state, action) => {
      state.auths.idToken = action.payload;
    },
    getRefreshedTokens: (state, action) => {
      state.auths.refreshToken = action.payload;
    },
    removeAuthSate: () => {
      return initialState;
    },
  },
});

export const {
  loginAuth,
  getUserData,
  getUserIdToken,
  getUserAccessToken,
  getRefreshedTokens,
  removeAuthSate,
} = authSlice.actions;
export const getAuthState = (state: RootState) => state.auth.auths;
export const authSliceReducer = authSlice.reducer;
