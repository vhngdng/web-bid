import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './service/auth.service';
import { bidApi } from './service/bid.service';
import { messageApi } from './service/message.service';
import { participantApi } from './service/participant.service';
import authReducer from './slice/auth.slice';
const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
        [bidApi.reducerPath]: bidApi.reducer,
        [participantApi.reducerPath]: participantApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare().concat(
            authApi.middleware,
            messageApi.middleware,
            bidApi.middleware,
            participantApi.middleware,
        ),
});

export default store;
