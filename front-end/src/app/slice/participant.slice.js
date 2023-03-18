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
    reducers: {
        // fetchParticipant: (state, { payload }) => {},
        joinParticipant: (state, { payload }) => {
            if (state.filter((room) => room.bidId === payload.bid).length > 0) {
                console.log('id ton tai');
                const { participants } = state.filter(
                    (room) => room.bidId === payload.bidId,
                );
                if (!(payload in participants)) {
                    participants.push(payload);
                    return state;
                }
            } else {
                state.push({ bidId: payload.bidId, participants: payload });
                return state;
            }
        },
        leaveParticipant: (state, { payload }) => {
            const room = state.find((member) => member.bidId === payload.bidId);
            const index = state.findIndex(room);
            const updateRoom = room.participants.filter(
                (p) => p.username !== payload.username,
            );
            state[index] = updateRoom;
            return state;
        },
    },
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
