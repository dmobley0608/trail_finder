import React from 'react'
import logo from '../../static/images/trailFinderLogo.png'
import './loading.styles.css'

export default function Loading({ message = '' }) {
    return (
        <div id='loading-screen' className='h-full min-h-[95vh] w-full overflow-hidden flex flex-col justify-center items-center'>
            <div className='relative w-full flex justify-center'>
                <div className='relative content-center w-full flex flex-col justify-center items-center max-w-[75%] '>
                    <img className='mx-auto w-[75%] max-w-[200px]' src={logo} alt='loading' />
                    <div className='absolute bottom-[45px] right-[] w-full'>
                        <div className='circle mx-auto animate-spin-slow border-slate-800'></div>
                    </div>
                    <h2 className='mt-20 font-bold text-lg text-center'>{message}</h2>
                </div>
            </div>

        </div>
    )
}
