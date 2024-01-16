import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const parksApi = createApi({
    reducerPath:'parksApi',
    baseQuery:fetchBaseQuery({baseUrl:'/api/parks'}),
    tagTypes:['Parks'],
    endpoints:(builder)=>({
        getAllParks:builder.query({
            query:()=>({url:'/'})
        }),
        getParkById:builder.query({
            query:(id)=>({url:`/${id}`}) 
        }),
        createNewPark: builder.mutation({
            query:({...body})=>({
                url:'/',
                method:'POST',
                body:body
                
            }),
            invalidatesTags:'Parks'
        })
    
    })
})

export const {useGetAllParksQuery, useGetParkByIdQuery, useCreateNewParkMutation} = parksApi