import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './service/auth.service';
import { bidApi } from './service/bid.service';
import { imagesApi } from './service/image.service';
import { messageApi } from './service/message.service';
import { participantApi } from './service/participant.service';
import { propeprtyApi } from './service/property.service';
import { PaymentApi } from './service/payment.service';
import { userApi } from './service/user.service';
import authReducer from './slice/auth.slice';
import imageReducer from './slice/image.slice';
import participantReducer from './slice/participant.slice';
import { searchApi } from './service/search.service';
const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
        [bidApi.reducerPath]: bidApi.reducer,
        [participantApi.reducerPath]: participantApi.reducer,
        [propeprtyApi.reducerPath]: propeprtyApi.reducer,
        [imagesApi.reducerPath]: imagesApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [PaymentApi.reducerPath]: PaymentApi.reducer,
        [searchApi.reducerPath]: searchApi.reducer,
        auth: authReducer,
        participant: participantReducer,
        image: imageReducer,
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare().concat(
            authApi.middleware,
            messageApi.middleware,
            bidApi.middleware,
            participantApi.middleware,
            propeprtyApi.middleware,
            imagesApi.middleware,
            userApi.middleware,
            PaymentApi.middleware,
            searchApi.middleware,
        ),
});

export default store;
