import { configureStore } from "@reduxjs/toolkit";
import parkFormSlice from "./parkFormSlice";
import { backendApi } from "./backendApi";



export const store = configureStore({
    reducer: {      
        [backendApi.reducerPath]:backendApi.reducer,
        //Non API REDUCERS
        parkForm:parkFormSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(          
            backendApi.middleware
            ),
}) 