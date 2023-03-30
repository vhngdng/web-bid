import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { logout, tokenReceived } from '../slice/auth.slice';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1',
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
                    'http://localhost:8080/api/v1/auth/refresh-token',
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
export const bidApi = createApi({
    reducerPath: 'bidApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getBidRoom: builder.query({
            query: () => 'bid-room',
        }),
        getBidRoomWithId: builder.query({
            query: (id) => `bid-room/${id}`,
        }),
        getRequestToChangeBidSuccess: builder.query({
            query: () => `admin/bid-room/before-finish`,
        }),
        updateSuccessBid: builder.mutation({
            query: (id) => `admin/bid-room/${id}-success`,
        }),
        runBidRoom: builder.mutation({
            query: (id) => ({
                url: `admin/update/${id}`,
                method: 'POST',
                body: { status: 'DEACTIVE' },
            }),
        }),
        createBid: builder.mutation({
            query: (body) => ({
                url: `admin/bid-room`,
                method: 'POST',
                body,
            }),
        }),
        getAllBidPreparingToRun: builder.query({
            query: () => `admin/bid-room/prepare`,
        }),
        getAllBidRoomPaging: builder.query({
            query: (page) => {
                if (!page) {
                    return `admin/bid-room/paging`;
                } else {
                    return `admin/bid-room/paging${page}`;
                }
            },
        }),
    }),
});

export const {
    useGetBidRoomQuery,
    useGetBidRoomWithIdQuery,
    useGetRequestToChangeBidSuccessQuery,
    useUpdateSuccessBidMutation,
    useCreateBidMutation,
    useGetAllBidPreparingToRunQuery,
    useRunBidRoomMutation,
    useGetAllBidRoomPagingQuery,
} = bidApi;
