import { configureStore } from "@reduxjs/toolkit";
import { parksApi } from "./parksApi";
import { usersApi } from "./userAPI";
import { parkReviewsApi } from "./parkReviewsApi";
import { addressAPI } from "./addressValidation";


export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [parksApi.reducerPath]: parksApi.reducer,
        [parkReviewsApi.reducerPath]: parkReviewsApi.reducer,
        [addressAPI.reducerPath]: addressAPI.reducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(parksApi.middleware, usersApi.middleware, parkReviewsApi.middleware, addressAPI.middleware),
})