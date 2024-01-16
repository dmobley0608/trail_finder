import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const parkReviewsApi = createApi({
    reducerPath: 'parkReviewsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/park-reviews' }),
    tagTypes: ['Parks', 'ParkReviews'],
    endpoints: (builder) => ({
        getParkReviews: builder.query({
            query: (parkId) => {
                return {
                url: `/${parkId}`,
                }
                
            },
            providesTags:['ParkReviews']

        }),
        addParkReview: builder.mutation({
            query: ({ ...body }) => ({
                url: `/${body.park}`,
                method: 'POST',
                body: body

            }),
            invalidatesTags: ['ParkReviews']
        })

    })
})

export const { useAddParkReviewMutation, useGetParkReviewsQuery } = parkReviewsApi
