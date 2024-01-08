import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath:'usersApi',
    baseQuery:fetchBaseQuery({baseUrl:'/api/auth'}),
    endpoints:(builder)=>({
        registerNewUser:builder.mutation({
            query:({...body})=>({
                url:'/create',
                method:'POST',
                body:body
            })
        }),
        login:builder.mutation({
            query:({...body})=>({
                url:'/login',
                method:'POST',
                body:body
            })
        })
    })
})

export const {useRegisterNewUserMutation, useLoginMutation} = usersApi 