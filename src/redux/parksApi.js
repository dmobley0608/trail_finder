import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const parksApi = createApi({
    reducerPath:'parksApi',
    baseQuery:fetchBaseQuery({baseUrl:'/api/parks'}),
    endpoints:(builder)=>({
        getAllParks:builder.query({
            query:()=>({url:'/'})
        }),
        createNewPark: builder.mutation({
            query:({...body})=>({
                url:'/',
                method:'POST',
                body:body
            })
        })
    })
})

export const {useGetAllParksQuery, useCreateNewParkMutation} = parksApi