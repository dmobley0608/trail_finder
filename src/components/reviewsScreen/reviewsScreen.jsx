import React, { useState } from 'react'
import StarRating from '../parkStarRating/starRating'
import ParkReviewCard from '../cards/parkReviewCard'
import TransitionScreen from '../transitionScreens/transitionScreen'
import TransitionTitle from '../transitionScreens/transitionTitle'
import ParkReviewForm from '../forms/parkReviewForm'
import { useGetParkReviewsQuery } from '../../redux/parkReviewsApi'
import Loading from '../../pages/loading/loading'

export default function ReviewsScreen({ open, setOpen, park }) {
    const [openReviewForm, setOpenReviewForm] = useState(false)
    const { data: parkReviews, isLoading } = useGetParkReviewsQuery(park.id)

    return (
        <TransitionScreen open={open} setOpen={setOpen}
            titleBody={<TransitionTitle title={park.name}>
                <div onClick={() => setOpenReviewForm(!openReviewForm)}>
                    <div className='text-sm font-light flex justify-center items-center hover:cursor-pointer hover:font-semibold hover:scale-105'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.5} stroke="currentColor" className="w-6 h-6 mr-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>
                        <p>Leave A Comment</p>
                    </div>

                    <StarRating parkReviews={parkReviews} />
                </div>



            </TransitionTitle>}>
            {isLoading ? <Loading /> :
                <div className="relative  flex-1 px-4 sm:px-6 max-h-[90%] overflow-scroll">
                    {parkReviews.map(review => (
                        <ParkReviewCard key={review.id} review={review} />
                    ))}
                </div>
            }
            <TransitionScreen enterFrom='translate-x-[-100vw] ' open={openReviewForm} setOpen={setOpenReviewForm} titleBody={<TransitionTitle title={"Leave A Review"} />}>
                <ParkReviewForm park={park} onComplete={() => setOpenReviewForm(false)} />
            </TransitionScreen>
        </TransitionScreen>

    )
}
