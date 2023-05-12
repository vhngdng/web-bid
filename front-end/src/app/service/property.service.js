/* eslint-disable no-extra-boolean-cast */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { logout, tokenReceived } from '../slice/auth.slice';
import { DOMAIN_URL } from '~/CONST/const';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: DOMAIN_URL + 'api/v1',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-type', 'application/json');
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const { refreshToken } = api.getState().auth;
                const refreshResult = await fetch(
                    DOMAIN_URL + 'api/v1/auth/refresh-token',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ refreshToken }),
                    },
                );
                const data = await refreshResult.json();
                if (data) {
                    api.dispatch(tokenReceived(data.accessToken));
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                }
                if (refreshResult?.data) {
                    api.dispatch(tokenReceived(refreshResult.data));
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};
export const propeprtyApi = createApi({
    reducerPath: 'propeprtyApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAllProperty: builder.query({
            query: (url) =>
                !!url ? `admin/properties?${url}` : `admin/properties`,
        }),
        getAllPropertyByUserLogin: builder.query({
            query: () => `user/properties`,
        }),
        getListPropertyForGuest: builder.query({
            query: (url) =>
                !!url ? `guest/list-property?${url}` : `guest/list-property`,
        }),
        getDetailPropertyForGuest: builder.query({
            query: (propertyId) => `guest/list-property/${propertyId}`,
        }),
        getAllPropertyNotBid: builder.query({
            query: () => `admin/properties-not-bid`,
        }),
        createProperty: builder.mutation({
            query: (body) => ({
                url: `user/properties`,
                method: 'POST',
                body,
            }),
        }),
        updateProperty: builder.mutation({
            query: ({ propertyId, ...body }) => ({
                url: `user/properties/${propertyId}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteUserProperty: builder.mutation({
            query: (propertyId) => ({
                url: `user/delete-properties/${propertyId}`,
                method: 'DELETE',
            }),
        }),
        registerProperty: builder.mutation({
            query: ({ propertyId, ...body }) => ({
                url: `user/register-properties/${propertyId}`,
                method: 'PUT',
                body,
            }),
        }),
        getAllDetailsProperty: builder.query({
            query: (id) => `user/property/${id}`,
        }),
        getAdminDetailProperty: builder.query({
            query: (id) => `admin/properties/${id}`,
        }),
    }),
});

export const {
    useGetAllPropertyQuery,
    useGetAllPropertyByUserLoginQuery,
    useGetAllPropertyNotBidQuery,
    useCreatePropertyMutation,
    useGetAllDetailsPropertyQuery,
    useGetAdminDetailPropertyQuery,
    useUpdatePropertyMutation,
    useRegisterPropertyMutation,
    useDeleteUserPropertyMutation,
    useLazyGetListPropertyForGuestQuery,
    useGetDetailPropertyForGuestQuery,
} = propeprtyApi;
