import React from 'react'
import logo from '../../static/images/trailFinderLogo.png'
import './loading.styles.css'

export default function Loading({message=''}) {
    return (
        <div id='loading-screen' className='h-full w-full overflow-hidden flex flex-col justify-center items-center'>
            <div className='relative content-center w-full flex flex-col justify-center items-center max-w-[75%] '>
                <img className='mx-auto w-[75%]' src={logo} alt='loading' />
                <div className='absolute top-[-50px] right-[25px] w-full'>
                    <div className='circle mx-auto animate-spin-slow border-slate-800'></div>
                </div>
                <h2 className='mt-20 font-bold text-lg text-center'>{message}</h2>
            </div>
        </div>
    )
}
