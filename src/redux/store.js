import { configureStore } from "@reduxjs/toolkit";
import { parksApi } from "./parksApi";

export const store = configureStore({
    reducer:{
        [parksApi.reducerPath]: parksApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(parksApi.middleware),
})