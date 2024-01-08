import { configureStore } from "@reduxjs/toolkit";
import { parksApi } from "./parksApi";
import { usersApi } from "./userAPI";

export const store = configureStore({
    reducer:{
        [usersApi.reducerPath]: usersApi.reducer,
        [parksApi.reducerPath]: parksApi.reducer,
        
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(parksApi.middleware, usersApi.middleware),
})