/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createSlice } from '@reduxjs/toolkit';
import {
    getDataFromLocalStorage,
    setDataToLocalStorage,
} from '~/utils/localStorageUtils';
import { authApi } from '../service/auth.service';
import { AUTHPUBLIC } from '~/CONST/const';

const defaultState = {
    auth: null,
    token: null,
    isAuthenticated: false,
    refreshToken: null,
};

const initialState = getDataFromLocalStorage(AUTHPUBLIC)
    ? getDataFromLocalStorage(AUTHPUBLIC)
    : defaultState;

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, { payload }) => {
            setDataToLocalStorage(AUTHPUBLIC, defaultState);
            return defaultState;
        },
        tokenReceived: (state, { payload }) => {
            setDataToLocalStorage(AUTHPUBLIC, { ...state, token: payload });
            return { ...state, token: payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.auth = payload.auth;
                    state.token = payload.token;
                    state.isAuthenticated = payload.isAuthenticated;
                    state.refreshToken = payload.refreshToken;
                    //TODO :Cần lưu vào localStorage
                    setDataToLocalStorage(AUTHPUBLIC, state);
                },
            )
            .addMatcher(
                authApi.endpoints.createUser.matchFulfilled,
                (state, { payload }) => {
                    state.auth = payload.auth;
                    state.token = payload.token;
                    state.isAuthenticated = payload.isAuthenticated;
                    state.refreshToken = payload.refreshToken;
                    //TODO :Cần lưu vào localStorage
                    setDataToLocalStorage(AUTHPUBLIC, state);
                },
            )
            .addMatcher(
                authApi.endpoints.loginGoogle.matchFulfilled,
                (state, { payload }) => {
                    state.auth = payload.auth;
                    state.token = payload.token;
                    state.isAuthenticated = payload.isAuthenticated;
                    state.refreshToken = payload.refreshToken;
                    //TODO :Cần lưu vào localStorage
                    setDataToLocalStorage(AUTHPUBLIC, state);
                },
            );
    },
});

export const { logout, tokenReceived } = AuthSlice.actions;

export default AuthSlice.reducer;
