import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath:'usersApi',
    baseQuery:fetchBaseQuery({baseUrl:'/api/auth'}),
    tagTypes: ['User'],
    endpoints:(builder)=>({
        getUser: builder.query({
            query:()=> '/',            
            providesTags:['User']
        }),
        registerNewUser:builder.mutation({
            query:({...body})=>({
                url:'/create',
                method:'POST',
                body:body
            }),
            invalidatesTags:['User']
        }),
        login:builder.mutation({
            query:({...body})=>({
                url:'/login',
                method:'POST',
                body:body,                
            }),
            invalidatesTags:['User']
            
        }),
        logout:builder.query({
            query:()=>'/logout',
            invalidatesTags:['User'] 
        })
    })
})

export const {useRegisterNewUserMutation, useLoginMutation, useGetUserQuery, useLazyLogoutQuery} = usersApi 