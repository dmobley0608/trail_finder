import React, { useState } from 'react'

import { Link, useParams } from 'react-router-dom'
import Loading from '../loading/loading'
import StarRating from '../../components/parkStarRating/starRating'
import ReviewFormScreen from '../../components/reviewsScreen/reviewsScreen'
import TransitionScreen from '../../components/transitionScreens/transitionScreen'
import ParkReviewForm from '../../components/forms/parkReviewForm'
import TransitionTitle from '../../components/transitionScreens/transitionTitle'
import ParkReviewCard from '../../components/cards/parkReviewCard'
import AddParkForm from '../../components/forms/addParkForm'
import { useGetParkByIdQuery } from '../../redux/backendApi'
import { useDispatch, useSelector } from 'react-redux'
import { setShowForm } from '../../redux/parkFormSlice'

export default function Park() {
    let { id } = useParams()
    const [showReviewScreen, setShowReviewScreen] = useState(false)
    const [showReviewForm, setShowReviewForm] = useState(false)    
    const { data: park, isLoading } = useGetParkByIdQuery(id)
    const showParkForm = useSelector(state=>state.parkForm.showForm)
    const dispatch = useDispatch()

    return (
        <>
            {isLoading ? <Loading /> :
                <div className='md:grid grid-cols-8 min-h-full'>
                    <div className='col-start-3 col-span-4 flex flex-col justify-start items-center w-full '>
                        <div className='flex w-full justify-center'>
                            <svg onClick={()=>dispatch(setShowForm(true))} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                             className="w-6 h-6 hover:cursor-pointer hover:scale-105" title="Edit Park">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            <h1 className='uppercase font-bold text-xl tracking-wide'>{park.name}</h1>
                            <TransitionScreen open={showParkForm} setOpen={()=>dispatch(setShowForm(!showParkForm))} titleBody={<TransitionTitle title='Update Park'/>}>
                                <AddParkForm park={park}/>
                            </TransitionScreen>
                        </div>
                        <div className='mx-2'>

                        </div>
                        <div className=''>
                            <StarRating parkReviews={park.ParkReviews} showForm={setShowReviewForm} showScreen={setShowReviewScreen} />
                            <ReviewFormScreen open={showReviewScreen} setOpen={setShowReviewScreen} park={park} />
                            <TransitionScreen enterFrom='translate-x-[-100vw] ' open={showReviewForm} setOpen={setShowReviewForm}
                                titleBody={<TransitionTitle title={"Leave A Review"} />}>
                                <ParkReviewForm park={park} onComplete={() => setShowReviewScreen(true)} />
                            </TransitionScreen>
                        </div>


                        <div className='w-full  flex flex-col p-5 justify-center items-center'>
                            <img className='w-[75%] ' src="https://www.exploregeorgia.org/sites/default/files/listing_images/profile/3955/Watson_Mill_Bridge3-full.jpg" alt='park' />

                        </div>
                    </div>
                    <div className='  col-start-1 row-start-1 col-span-2  w-full   flex items-center'>
                        <div className='text-start  w-full  h-full flex flex-col justify-evenly border capitalize px-5'>
                            <div>
                                {park.streetAddress && <p><span className='font-semibold'>Address:</span> {park.streetAddress}</p>}
                                <p className=' '><span className='font-semibold'>City/State:</span>{park.city}, {park.state}</p>
                                {park.zip && <p><span className='font-semibold'>Zip:</span> {park.zip}</p>}
                            </div>

                           
                            {park.phone &&
                                <Link className='flex justify-start items-center' to={`tel:${park.phone}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                                    </svg>

                                    <p> {park.phone}</p>
                                </Link>}
                            {park.parkingFee > 0 && <p><span className='font-semibold'>Parking Fee: $</span>{park.parkingFee.toFixed(2)}</p>}
                            {park.horseFee > 0 && <p><span className='font-semibold'>Riding/Horse Fee: $</span> {park.horseFee.toFixed(2)}</p>}
                            {park.Trails.length > 0 ? <p><span className='font-semibold'>Number of Trails: </span> {park.Trails.length}</p> : "No Trails Recorded"}
                            {park.url && <Link className='font-bold text-indigo-600 tracking-widest hover:text-indigo-400 hover:underline' to={park.url} target="_blank" rel="noopener noreferrer">Official Website</Link>}
                        </div>
                        <hr />
                        {park.description && <p><span className='font-semibold'>A Little about the park <br /></span>{park.description}</p>}
                        <hr />
                    </div>
                    <div className='w-full col-start-7 row-start-1 col-span-2 hidden md:block h-full overflow-y-scroll px-3 border-l-2'>
                        <h2 className='uppercase tracking-wide font-semibold'>Reviews</h2>                        
                        <button className='bg-indigo-800 text-white p-2 mt-1 rounded hover:bg-indigo-500'>Leave a Review</button>
                        {park.ParkReviews.map(review => (
                            <ParkReviewCard key={review.id} review={review} />
                        ))}
                    </div>

                    <div className='col-start-1 col-span-8  mt-5'>
                        <h2 className='font-semibold text-xl'>Gallery</h2>
                        <div>
                            {park.ParkImages ?
                                park.parkImages.map(image => (
                                    <img src={image.url} alt='park' />
                                ))
                                :
                                <div>
                                    <p>Looks like the gallery is empty. Sign in to upload photos</p>
                                </div>
                            }
                        </div>

                    </div>
                </div>

            }
        </>
    )
}
