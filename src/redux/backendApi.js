import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const backendApi = createApi({
    reducerPath:'backendApi',
    baseQuery:fetchBaseQuery({baseUrl:'/api'}),
    tagTypes:['Parks', 'Park','ParkReviews', 'ParkReview', 'Trails','Trail', 'Users'],
    endpoints:(builder)=>({
        //Parks
        getAllParks:builder.query({
            query:()=>({url:'/parks'}),
            providesTags:['Parks']
        }),
        getParkById:builder.query({
            query:(id)=>({url:`/parks/${id}`}),
            providesTags:['Park'] 
        }),
        createNewPark: builder.mutation({
            query:({...body})=>({
                url:'/parks/',
                method:'POST',
                body:body
                
            }),
            invalidatesTags:['Parks']
        }),
        updateParkById:builder.mutation({
            query:({...body})=>({
                url:`/parks/${body.id}`,
                method:'PUT',
                body:body
            }),
            invalidatesTags:['Park']
        }),
        //Park Reviews
        getParkReviews: builder.query({
            query: (parkId) => {
                return {
                url: `/park-reviews/${parkId}`,
                }
                
            },
            providesTags:['ParkReviews']

        }),
        addParkReview: builder.mutation({
            query: ({ ...body }) => ({
                url: `/park-reviews/${body.park}`,
                method: 'POST',
                body: body

            }),
            invalidatesTags: ['ParkReviews']
        }),
        
        //Trails
        addTrailToPark: builder.mutation({
            query:({...body})=>({
                url:`/trails/${body.parkId}`,
                method:'POST',
                body:body
            }),
            invalidatesTags:['Park, Trails']
        }),
        deleteTrailFromPark: builder.mutation({
            query:(id)=>{
                return{
                url:`/trails/${id}`,
                method:"DELETE"
            }
        },
            invalidatesTags:["Park", "Trail"]
        }),
        //Users
        getUser: builder.query({
            query:()=> '/auth',            
            providesTags:['User']
        }),
        registerNewUser:builder.mutation({
            query:({...body})=>({
                url:'/auth/create',
                method:'POST',
                body:body
            }),
            invalidatesTags:['User']
        }),
        login:builder.mutation({
            query:({...body})=>({
                url:'/auth/login',
                method:'POST',
                body:body,                
            }),
            invalidatesTags:['User']
            
        }),
        logout:builder.query({
            query:()=>'/auth/logout',
            invalidatesTags:['User']
        })
    })

  
    
    
})

export const {
    useGetAllParksQuery, 
    useGetParkByIdQuery, 
    useCreateNewParkMutation,
    useUpdateParkByIdMutation,
    useAddTrailToParkMutation, 
    useDeleteTrailFromParkMutation,
    useRegisterNewUserMutation,
    useLoginMutation,
    useGetUserQuery,
    useLazyLogoutQuery,
    useAddParkReviewMutation, 
    useGetParkReviewsQuery
} = backendApi