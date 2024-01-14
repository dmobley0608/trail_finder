import React from 'react'
import StarRating from '../parkStarRating/starRating'

export default function ParkReviewCard({ review }) {
    
    return (
        <div className='mb-10 border-b-2 border-b-indigo-400 p-3  shadow-xl'>
            <div className='flex'>
                <p className='mr-3'>{review.User.firstName}</p>
                <StarRating rating={review.rating} />
            </div>

            <p>{new Date(review.date).toDateString()}</p>
            <p>{review.body}</p>
        </div>
    )
}
