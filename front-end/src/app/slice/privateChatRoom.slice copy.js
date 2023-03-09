import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const privateChatRoomSlice = createSlice({
    name: 'privateChatRoom',
    initialState,
    reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = privateChatRoomSlice.actions;

export default privateChatRoomSlice.reducer;
