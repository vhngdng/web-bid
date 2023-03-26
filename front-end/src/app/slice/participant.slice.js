import { createSlice } from '@reduxjs/toolkit';
import { participantApi } from '../service/participant.service';

// Call enableMapSet() before using any Map or Set objects with Immer
const initialState = [
    // bidId: 0
    // participants: []
];
// eslint-disable-next-line no-undef
const participantSlice = createSlice({
    name: 'partitipantRoom',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            participantApi.endpoints.getParticipantWithBidId.matchFulfilled,
            // eslint-disable-next-line no-unused-vars
            (state, { payload }) => {
                if (
                    payload.length > 0 &&
                    state.filter((room) => room.bidId === payload[0].bidId)
                        .length === 0
                ) {
                    state.push({
                        bidId: payload[0].bidId,
                        participants: payload,
                    });
                }
            },
        );
    },
});

// eslint-disable-next-line no-empty-pattern
export const { joinParticipant, leaveParticipant } = participantSlice.actions;

export default participantSlice.reducer;
