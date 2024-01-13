import React from 'react'
import ParkSearchBar from '../../components/parkSearchBar/parkSearchBar'
import {  useGetAllParksQuery } from '../../redux/parksApi'
import { NavLink } from 'react-router-dom'


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
           
            <section>
                <hr/>
                {data.map(park=>(
                    <NavLink key={park.id} to={`/parks/${park.id}`} className='mt-2 border-y flex flex-col'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcSlgdyby0yUYw0svm_Q97gArVD9rBgThWww&usqp=CAU' alt='park'/>
                        <p className='text-lg font-bold uppercase'>{park.name}</p>
                        <p className='text-sm font-bold uppercase'>{park.streetAddress}</p>
                        <p className='text-sm font-bold uppercase'>{park.city}, {park.zip}</p>
                        <p className='text-lg font-bold uppercase'>{park.state}</p>
                        {park.Trails.length > 0 && <p className='text-sm font-bold uppercase'>Miles of Trails: {park.Trails.map(trail=>trail.length).reduce((a,b)=>a+b)}</p>                       }
                        <p className='text-lg font-bold uppercase'>Rating: {park.rating}</p>
                    </NavLink>
                ))}
            </section>
            }
        </div>
    )
}
