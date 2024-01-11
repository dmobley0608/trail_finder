import React, { Fragment, useState } from 'react'

import AddParkForm from '../../components/forms/addParkForm'
import DashboardButton from '../../components/dashboardButtons/dashboardButton'
import DashboardSlideScreen from '../../components/dashboardScreens/dashboardScreen'



export default function Dashboard() {

    const [openParkForm, setOpenParkForm] = useState(false)
    const [openRideForm, setOpenRideForm] = useState(false)
    const [openBarnScreen, setOpenBarnScreen] = useState(false)
    const [openProfileScreen, setOpenProfileScreen] = useState(false)

    return (
        <>
            <div>
                <h2 className='text-xl font-bold'>Utilities</h2>
                <div className='w-full justify-center'>
                    <div className='mt-5 flex flex-wrap justify-center mx-auto max-w-sm'>
                        <div>
                            <DashboardButton open={openRideForm} setOpen={setOpenRideForm}>Add Ride</DashboardButton>
                            <DashboardButton open={openParkForm} setOpen={setOpenParkForm}>Add Park</DashboardButton>
                        </div>
                        <div>
                            <DashboardButton open={openBarnScreen} setOpen={setOpenBarnScreen}>Manage Barn</DashboardButton>
                            <DashboardButton open={openProfileScreen} setOpen={setOpenProfileScreen}>Edit Profile</DashboardButton>
                        </div>
                    </div>
                </div>


            </div>
            <DashboardSlideScreen open={openParkForm} setOpen={setOpenParkForm} title="Create A New Park" description={'Use this form to add a park to the public view list.'}>
                <AddParkForm />
            </DashboardSlideScreen>

            <DashboardSlideScreen open={openRideForm} setOpen={setOpenRideForm} title="Add A New Ride" description={"Use this form to help keep track of your rides"}>
                "Ride Form"
            </DashboardSlideScreen>

            <DashboardSlideScreen open={openBarnScreen} setOpen={setOpenBarnScreen} title="Manage Your Barn" description={"Use this screen to manage your horses."}>
                "Barn Screen"
            </DashboardSlideScreen>

            <DashboardSlideScreen open={openProfileScreen} setOpen={setOpenProfileScreen} title="Manage your profile" description={"Use this screen to manage your profile."}>
                "Profile Screen"
            </DashboardSlideScreen>
        </>

    )
}
