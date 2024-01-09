import React from 'react'
import Navbar from '../../navbar/navbar'
import { Outlet } from 'react-router'
import { useGetUserQuery } from '../../../../redux/userAPI'
import Loading from '../../../../pages/loading/loading'

export default function Root() {
 
  return (
    <div>
     
      
          <Navbar />
          <Outlet />
     
   
    </div>

  )
}
