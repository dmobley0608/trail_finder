import React from 'react'

export default function DashboardButton({children,open, setOpen, text}) {
  return (
    <button className='bg-indigo-800  text-white rounded h-[100px] w-[100px] m-2' onClick={() => { setOpen(!open) }}>{children}</button>
  )
}
