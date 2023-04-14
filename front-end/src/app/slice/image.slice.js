/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createSlice } from '@reduxjs/toolkit';
import { imagesApi } from '../service/image.service';

const initialState = [];

const ImageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        removeImage: (state, { payload }) => {
            state = initialState;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                imagesApi.endpoints.getAllImagesNotProperty.matchFulfilled,
                (state, { payload }) => {
                    state = payload;
                    return state;
                },
            )
            .addMatcher(
                imagesApi.endpoints.uploadImage.matchFulfilled,
                (state, { payload }) => {
                    state.push(payload);
                },
            )
            .addMatcher(
                imagesApi.endpoints.updateTypeImage.matchFulfilled,
                (state, { payload }) => {
                    state.map((image) => {
                        if (image.type === payload.type) {
                            image.type = null;
                        }
                        return image;
                    });
                    state.map((image) => {
                        if (image.id === payload.id) {
                            image.type = payload.type;
                        }
                        return image;
                    });
                    return state;
                },
            );
    },
});

export const { removeImage } = ImageSlice.actions;

export default ImageSlice.reducer;
