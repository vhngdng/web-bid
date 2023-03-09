import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    bidRoom: new Map(),
};
const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = messageSlice.actions;

export default messageSlice.reducer;
