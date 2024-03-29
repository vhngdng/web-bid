/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createSlice } from '@reduxjs/toolkit';
import {
    getDataFromLocalStorage,
    setDataToLocalStorage,
} from '~/utils/localStorageUtils';
import { authApi } from '../service/auth.service';
import { AUTHPUBLIC } from '~/CONST/const';
import { imagesApi } from '../service/image.service';
import { useDispatch } from 'react-redux';

const defaultState = {
    auth: null,
    token: null,
    avatar: null,
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
            state = defaultState;
            return state;
        },
        tokenReceived: (state, { payload }) => {
            setDataToLocalStorage(AUTHPUBLIC, { ...state, token: payload });
            return { ...state, token: payload };
        },
        updateAvatar: (state, { payload }) => {
            console.log('payload', payload);
            console.log('state', state.auth);
            setDataToLocalStorage(AUTHPUBLIC, {
                ...state,
                avatar: payload,
            });
            return {
                ...state,
                avatar: payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.auth = payload.auth;
                    state.token = payload.token;
                    state.avatar = payload.avatar;
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
                    state.avatar = payload.avatar;
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
                    state.avatar = payload.avatar;
                    state.isAuthenticated = payload.isAuthenticated;
                    state.refreshToken = payload.refreshToken;
                    //TODO :Cần lưu vào localStorage
                    setDataToLocalStorage(AUTHPUBLIC, state);
                },
            );
    },
});

export const { logout, tokenReceived, updateAvatar } = AuthSlice.actions;

export default AuthSlice.reducer;
