/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { logout, tokenReceived } from '../slice/auth.slice';
import { DOMAIN_URL } from '~/CONST/const';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: DOMAIN_URL + 'api/v1/',
    // headers: { 'Content-Type': 'application/json' },
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
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
// Define a service using a base URL and expected endpoints
export const imagesApi = createApi({
    reducerPath: 'imagesApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (body) => ({
                url: `images`,
                method: 'POST',
                credentials: 'include',
                body,
            }),
        }),
        uploadMultiImageProperty: builder.mutation({
            query: ({ propertyId, body }) => ({
                url: `images/multi-file/${propertyId}`,
                method: 'POST',
                credentials: 'include',
                body,
            }),
            headers: { 'Content-Type': 'application/json' },
        }),
        getAllImagesNotProperty: builder.query({
            query: () => ({
                url: `images/not-property/all`,
                credentials: 'include',
            }),
        }),
        getAvatar: builder.query({
            query: () => ({
                url: `images/avatar`,
                credentials: 'include',
            }),
        }),
        getBackground: builder.query({
            query: () => ({
                url: `images/background`,
                credentials: 'include',
            }),
        }),
        getImageByPropertyTypeProperty: builder.query({
            query: (id) => ({
                url: `images/property/${id}`,
                credentials: 'include',
            }),
        }),
        getAllImageOfProperty: builder.query({
            query: (id) => ({
                url: `images/property-all-images/${id}`,
                credentials: 'include',
            }),
        }),
        readImage: builder.query({
            query: (id) => ({
                url: `images/read/${id}`,
                credentials: 'include',
            }),
        }),
        updateTypeImage: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `images/${id}`,
                method: 'PUT',
                credentials: 'include',
                body,
            }),
        }),
        deleteImage: builder.mutation({
            query: (id) => ({
                url: `images/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useUploadImageMutation,
    useGetAllImagesNotPropertyQuery,
    useLazyReadImageQuery,
    useUpdateTypeImageMutation,
    useGetAvatarQuery,
    useGetBackgroundQuery,
    useLazyGetImageByPropertyTypePropertyQuery,
    useDeleteImageMutation,
    useUploadMultiImagePropertyMutation,
    useGetAllImageOfPropertyQuery,
} = imagesApi;
