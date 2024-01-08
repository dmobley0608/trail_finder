import React from 'react'
import Navbar from '../../navbar/navbar'
import { Outlet } from 'react-router'

export default function Root() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}
