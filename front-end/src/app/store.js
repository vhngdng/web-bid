import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './service/auth.service';
import { bidApi } from './service/bid.service';
import { imagesApi } from './service/image.service';
import { messageApi } from './service/message.service';
import { participantApi } from './service/participant.service';
import { propeprtyApi } from './service/property.service';
import authReducer from './slice/auth.slice';
import participantReducer from './slice/participant.slice';
const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
        [bidApi.reducerPath]: bidApi.reducer,
        [participantApi.reducerPath]: participantApi.reducer,
        [propeprtyApi.reducerPath]: propeprtyApi.reducer,
        [imagesApi.reducerPath]: imagesApi.reducer,
        auth: authReducer,
        participant: participantReducer,
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare().concat(
            authApi.middleware,
            messageApi.middleware,
            bidApi.middleware,
            participantApi.middleware,
            propeprtyApi.middleware,
            imagesApi.middleware,
        ),
});

export default store;
