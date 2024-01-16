import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const addressAPI = createApi({
    reducerPath:'addressApi',
    baseQuery:fetchBaseQuery({baseUrl:'https://addressvalidation.googleapis.com/v1:validateAddress'}),
    endpoints:(builder)=>({
        findAddress:builder.mutation({
            query:({...body})=>({
                url:'',
                method:'POST',
                body:body
            })
        })
    })
})

export const {useFindAddressMutation} = addressAPI