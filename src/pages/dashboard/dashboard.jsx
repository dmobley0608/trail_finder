import React, { Fragment, useEffect, useState } from 'react'
import { useGetUserQuery } from '../../redux/userAPI'
import { useNavigate } from 'react-router'
import Loading from '../loading/loading'
import { Dialog, Transition } from '@headlessui/react'
import AddParkForm from '../../components/forms/addParkForm'
import { XMarkIcon } from '@heroicons/react/24/outline'
import DashboardButton from '../../components/dashboardButtons/dashboardButton'
import AddParkScreen from '../../components/dashboardScreens/addParkScreen'



export default function Dashboard() {
    const { data: user, isLoading, refetch } = useGetUserQuery()
    const [open, setOpen] = useState(false)
    const nav = useNavigate()

    // Concept is to have multiple button layouts for different options. ie (Add a park button and the park form slides over)
    const validateUser = async () => {
        await refetch().then(res => {
            if (!res.data.id) {
                nav('/sigin')
            }
        })
    }

    useEffect(() => {
        validateUser()
    }, [user])
    return (
        <>
            {isLoading ? <Loading /> :
                <>
                    {isLoading ? <Loading /> : <>
                        <div>
                            <h2 className='text-xl font-bold'>Utilities</h2>
                            <div className='mt-5 space-x-4'>
                                <DashboardButton open={open} setOpen={setOpen}>Add Ride</DashboardButton>
                                <DashboardButton open={open} setOpen={setOpen}>Add Park</DashboardButton>
                                <DashboardButton open={open} setOpen={setOpen}>Manage Barn</DashboardButton>
                                <DashboardButton open={open} setOpen={setOpen}>Edit Profile</DashboardButton>
                            </div>

                        </div>
                      <AddParkScreen open={open} setOpen={setOpen}/>

                    </>}
                </>
            }
        </>

    )
}
