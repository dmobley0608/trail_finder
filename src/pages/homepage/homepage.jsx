import React from 'react'
import ParkSearchBar from '../../components/parkSearchBar/parkSearchBar'

export default function Homepage() {
    return (
        <div className='border w-full min-h-dvh'>
            <section id="hero">
                <div className='container relative'>
                    <h1 className='text-3xl text-white font-extrabold tracking-widest absolute top-[50%] right-0 left-0'>Trail Finder</h1>
                    <div className=''>
                        <img className='' src='https://www.atlantatrails.com/wp-content/uploads/2019/02/atlantas-best-hiking-trails-our-top-10-favorite-hikes.jpg' alt='trail' />
                    </div>
                </div>
            </section>
            {/* Make Component */}
            <section>
                <ParkSearchBar/>
            </section>
            <h2 className='text-xl font-bold'>Featured Parks</h2>
            <hr/>
        </div>
    )
}
