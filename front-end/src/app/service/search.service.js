/* eslint-disable no-extra-boolean-cast */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DOMAIN_URL } from '~/CONST/const';
// import { DOMAIN_URL } from '~/CONST/const';
export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: fetchBaseQuery({
        baseUrl: DOMAIN_URL + 'api/v1',
    }),
    endpoints: (builder) => ({
        search: builder.query({
            query: ({ keyword, page }) =>
                `guest/search/${keyword}?page=${page - 1}`,
        }),
    }),
});

export const { useLazySearchQuery } = searchApi;
