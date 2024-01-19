import React from 'react'
import ParkSearchBar from '../../components/parkSearchBar/parkSearchBar'

import { NavLink } from 'react-router-dom'
import { useGetAllParksQuery } from '../../redux/backendApi'


export default function Homepage() {
    const { data = [], isLoading } = useGetAllParksQuery()

    return (
        <div className='border w-full'>
            <div id="hero" className=''>
                <div className='shadow-lg relative'>
                    <h1 className='text-3xl text-white font-extrabold tracking-widest absolute top-[50%] left-0 right-0'>Trail Finder</h1>
                    <div className=''>
                        <img className='' src='https://www.atlantatrails.com/wp-content/uploads/2019/02/atlantas-best-hiking-trails-our-top-10-favorite-hikes.jpg' alt='trail' />
                    </div>
                </div>
            </div>
            <ParkSearchBar />
            <h2 className='text-xl font-bold'>Featured Parks</h2>
            {isLoading ? <h2>Fetching Parks</h2> :

                <section className='mb-5'>
                    <hr />
                    {data.map(park => (
                        <NavLink key={park.id} to={`/parks/${park.id}`} className='mt-2 border-y flex flex-col justify-start items-center'>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcSlgdyby0yUYw0svm_Q97gArVD9rBgThWww&usqp=CAU' alt='park' />
                            {park.streetAddress && <p><span className='font-semibold'>Address:</span> {park.streetAddress}</p>}
                            <p className=' '><span className='font-semibold'>City/State:</span>{park.city}, {park.state}</p>
                            {park.zip && <p><span className='font-semibold'>Zip:</span> {park.zip}</p>}
                            {park.phone &&
                                <div className='flex justify-start items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                                    </svg>

                                    <p> {park.phone}</p>
                                </div>}
                            {park.parkingFee && <p><span className='font-semibold'>Parking Fee: $</span>{park.parkingFee}</p>}
                            {park.horseFee && <p><span className='font-semibold'>Riding/Horse Fee: $</span> {park.horseFee}</p>}
                            {park.Trails.length > 0 ? <p><span className='font-semibold'>Number of Trails: </span> {park.Trails.length}</p> : "No Trails Recorded"}

                        </NavLink>
                    ))}
                </section>
            }
        </div>
    )
}
