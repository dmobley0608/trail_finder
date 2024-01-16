import React, { useState } from 'react'
import StarRating from '../parkStarRating/starRating'
import { useGetUserQuery } from '../../redux/userAPI'
import TransitionScreen from '../transitionScreens/transitionScreen'
import ParkReviewForm from '../forms/parkReviewForm'
import TransitionTitle from '../transitionScreens/transitionTitle'

export default function ParkReviewCard({ review }) {
    const { data: user } = useGetUserQuery()
    const [openForm, setOpenForm] = useState(false)

    let date = new Date(review.date)
    date = date.toUTCString().substring(0, 16)

    return (
        <div className={`mb-10 mt-3 border-b-2 border-indigo-400 p-3 rounded-lg shadow-xl ${user && user.id === review.UserId ? 'bg-indigo-100' : ''}`}>
            <div className='flex'>
                { user && user.id === review.UserId && 
                <svg onClick={()=>setOpenForm(!openForm)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                }

                <p className='mr-3'>{review.User.firstName}</p>
                <StarRating rating={review.rating} />
            </div>

            <p>Date of Ride: {date}</p>
            <p>{review.body}</p>
            <p className='text-xs font-semibold text-right'>Submitted: {new Date(review.createdAt).toUTCString()}</p>
            <TransitionScreen open={openForm} setOpen={setOpenForm} titleBody={<TransitionTitle>Edit Your Review</TransitionTitle>}>
                <ParkReviewForm parkReview={review}/>
            </TransitionScreen>
        </div>
    )
}
