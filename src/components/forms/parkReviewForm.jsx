import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'


import Loading from '../../pages/loading/loading.jsx'
import { useAddParkReviewMutation, useGetUserQuery } from '../../redux/backendApi.js';


export default function ParkReviewForm({ park, onComplete, parkReview }) {
    let { register, handleSubmit, setError, clearErrors, setValue, formState: { errors } } = useForm({ defaultValues: { ...parkReview } });
    const [rating, setRating] = useState(null)
    const { data: user } = useGetUserQuery()
    const [addParkReview, { isLoading }] = useAddParkReviewMutation()


    const setStarRating = useCallback((rating) => {
        clearErrors()
        setRating(rating)       
        const stars = document.querySelectorAll('.star')
        for (let i = rating; i < stars.length; i++) {
            stars[i].setAttribute('fill', 'none')
            stars[i].setAttribute('stroke-width', '.25')
        }

        for (let i = rating - 1; i >= 0; i--) {
            stars[i].setAttribute('fill', 'gold')
            stars[i].setAttribute('stroke-width', '.75')
        }
    }, [clearErrors])



    const onSubmit = async (data) => {
        if (!rating) {
            console.log('setting error')
            setError("rating", { type: "manual", message: "custom message" })
            return
        }
        const body = { ...data, date: new Date(data.date).toISOString(), rating, park: park.id, user: user.id }
        const res = await addParkReview(body)
        if (res.data) {
            onComplete()
        }
    }

    useEffect(() => {
        if (parkReview) {
            setStarRating(parkReview.rating)
            setValue('date', new Date(parkReview.date).toISOString().substring(0, 10))
        }

    }, [parkReview, setStarRating, setValue])
    return (
        <> {isLoading ? <Loading /> :
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <p>Rate Your Visit</p>
                    <div className='flex'>
                        <svg onClick={(e) => { setStarRating(1) }} aria-valuenow={1} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.5} stroke="black" className="star w-6 h-6 outline-none hover:cursor-pointer hover:stroke-black font-light">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <svg onClick={(e) => setStarRating(2)} aria-valuenow={2} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.5} stroke="black" className="star w-6 h-6 outline-none font-light hover:cursor-pointer hover:stroke-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <svg onClick={(e) => setStarRating(3)} aria-valuenow={3} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.5} stroke="black" className="star w-6 h-6 outline-none font-light hover:cursor-pointer hover:stroke-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <svg onClick={(e) => setStarRating(4)} aria-valuenow={4} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.5} stroke="black" className="star w-6 h-6 outline-none font-light hover:cursor-pointer hover:stroke-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <svg onClick={(e) => setStarRating(5)} aria-valuenow={5} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.5} stroke="black" className="star w-6 h-6 outline-none font-light hover:cursor-pointer hover:stroke-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    </div>
                    {errors.rating && <span className='text-red-500 text-xs font-semibold uppercase'>Please rate the park.</span>}
                </div>

                <div className='mt-3'>
                    <label htmlFor='date' className="block text-sm font-medium leading-6 text-gray-900">Date of Visit</label>
                    <input id='date' type='date' {...register("date", { required: true })}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                    {errors.date && <span className='text-red-500 text-xs font-semibold uppercase'>Required</span>}
                </div>
                <div className='mt-3'>
                    <label htmlFor='body' className="block text-sm font-medium leading-6 text-gray-900">Tell Us About Your Visit</label>
                    <textarea id='body'  {...register("body")} rows={10}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    ></textarea>

                </div>
                <div>
                    <input type='submit' value='Submit' className='my-5 border py-2 px-6 rounded bg-indigo-800 text-white hover:bg-indigo-700 hover:cursor-pointer' />
                </div>
            </form>
        }
        </>
    )
}
