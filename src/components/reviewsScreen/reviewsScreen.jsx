import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'
import StarRating from '../parkStarRating/starRating'
import ParkReviewCard from '../cards/parkReviewCard'

export default function ReviewsScreen({ open, setOpen, park }) {

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition   ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-y-full scale-0 "
                                enterTo="translate-y-10"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0 "
                                leaveTo="translate-x-full scale-0 "
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen  ">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute right-5 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="relative rounded-md text-gray-800 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6 pb-3">
                                            <Dialog.Title className="flex flex-col justify-start items-start text-base font-semibold leading-6 text-gray-900">
                                                <p className='text-lg font-bold'>{park.name}</p>
                                                <div className='flex justify-center items-center hover:cursor-pointer'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                                    </svg>

                                                    <p className='text-xs'>Leave a review for the park</p>
                                                </div>

                                                <StarRating parkReviews={park.ParkReviews} />
                                            </Dialog.Title>

                                        </div>
                                        <hr />
                                        <div className="relative  flex-1 px-4 sm:px-6 max-h-[90%] overflow-scroll">
                                            {park.ParkReviews.map(review => (
                                                <ParkReviewCard key={review.id} review={review} />
                                            ))}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
