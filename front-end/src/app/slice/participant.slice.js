// import { createSlice } from '@reduxjs/toolkit';
// import { participantApi } from '../service/participant.service';

// const initialState = {
//     bidRoom: new Map(),
// };

// const participantSlice = createSlice({
//     name: 'partitipantRoom',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addMatcher(
//             participantApi.endpoints.getParticipantWithBidId.matchFulfilled,
//             (state, { payload }) => {
//                 state.bidRoom.set()
//                 //TODO :Cần lưu vào localStorage
//             },
//         );
//     },
// });

// export const {} = participantSlice.actions;

// export default participantSlice.reducer;
