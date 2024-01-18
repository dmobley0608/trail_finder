import React from 'react'
import logo from '../../static/images/trailFinderLogo.png'
import './loading.styles.css'

export default function Loading({message=''}) {
    return (
        <div id='loading-screen' className='h-vh'>
            <div className='absolute top-[35%] w-full'>
                <img className='mx-auto' src={logo} alt='loading' />
                <div className='absolute top-[-25px] w-full'>
                    <div className='circle mx-auto animate-spin-slow border-slate-800'></div>
                </div>
                <h2>{message}</h2>
            </div>
        </div>
    )
}
