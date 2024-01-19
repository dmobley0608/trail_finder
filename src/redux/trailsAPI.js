import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const trailsApi = createApi({
    reducerPath:'trailsApi',
    baseQuery: fetchBaseQuery({baseUrl:'/api/trails'}),
    tagTypes:['Trails, Trail'],
    endpoints:(builder)=>({
        addTrailToPark: builder.mutation({
            query:({...body})=>({
                url:`/${body.parkId}`,
                method:'POST',
                body:body
            }),
            invalidatesTags:['Park, Trails']
        }),
        deleteTrailFromPark: builder.mutation({
            query:(id)=>{
                return{
                url:`/${id}`,
                method:"DELETE"
            }
        },
            invalidatesTags:["Park", "Trail"]
        })
    })
})

export const {useAddTrailToParkMutation, useDeleteTrailFromParkMutation} = trailsApi