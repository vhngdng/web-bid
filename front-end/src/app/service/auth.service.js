import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/auth',
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
            }),
        }),
        loginGoogle: builder.mutation({
            query: (idToken) => ({
                url: `google?idToken=${idToken}`,
                // headers: {
                //     'Content-type': 'application/json',
                // },
            }),
        }),
    }),
});

export const { useLoginMutation, useLoginGoogleMutation } = authApi;
