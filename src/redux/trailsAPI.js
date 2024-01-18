import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const trailsApi = createApi({
    reducerPath:'trailsApi',
    baseQuery: fetchBaseQuery({baseUrl:'/api/trails'}),
    tagTypes:['Parks', 'Trails'],
    endpoints:(builder)=>({
        addTrailToPark: builder.mutation({
            query:({...body})=>({
                url:`/${body.parkId}`,
                method:'POST',
                body:body
            })
        })
    })
})

export const {useAddTrailToParkMutation} = trailsApi