import React from 'react'
import ParkSearchBar from '../../components/parkSearchBar/parkSearchBar'
import { parksApi, useGetAllParksQuery } from '../../redux/parksApi'


export default function Homepage() {
    const {data = [], error, isLoading} = useGetAllParksQuery()
    console.log(data)
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
            <section>
                {data.map(park=>(
                    <div key={park.id} className='mt-2 border-y flex flex-col'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcSlgdyby0yUYw0svm_Q97gArVD9rBgThWww&usqp=CAU' alt='park'/>
                        <p className='text-lg font-bold uppercase'>{park.name}</p>
                        <p>{park.streetAddress}</p>
                        <p>{park.state}</p>
                    </div>
                ))}
            </section>
        </div>
    )
}
