import React from 'react'

export default function ParkSearchBar() {
    
    return (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 p-5">
            <div className="sm:col-span-4">
              <h2 className='text-xl tracking-widest font-bold shadow-indigo-500 drop-shadow-xl '>FIND YOUR PARK</h2>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                 
                  <input                   
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Search"
                  />
                </div>                
              </div>
            </div>
            </div>
    )
}
