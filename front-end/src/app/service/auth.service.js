import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DOMAIN_URL } from '~/CONST/const';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: DOMAIN_URL + 'api/v1',
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
        }),
        loginGoogle: builder.mutation({
            query: (idToken) => ({
                url: `auth/google?idToken=${idToken}`,
                method: 'POST',
                // headers: {
                //     'Content-type': 'application/json',
                // },
            }),
        }),
        createUser: builder.mutation({
            query: (body) => ({
                url: `create/user`,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLoginGoogleMutation,
    useCreateUserMutation,
} = authApi;
