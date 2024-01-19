import React, { useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form"

import Loading from '../../pages/loading/loading';
import { NavLink, useNavigate } from 'react-router-dom';
import Popup from '../popup/popup';
import TrailForm from './trailForm';
import { useDispatch, useSelector } from 'react-redux';
import { closeForm, deleteTrail, resetForm, setTrail } from '../../redux/parkFormSlice';

import DeletePopup from '../popup/deletePopup';
import { useAddTrailToParkMutation, useCreateNewParkMutation, useDeleteTrailFromParkMutation, useUpdateParkByIdMutation } from '../../redux/backendApi';


export default function ParkForm({ park }) {
    //UseForm
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ defaultValues: park });
    //API
    const [createNewPark, { isLoading }] = useCreateNewParkMutation()
    const [updatePark, { isLoading: updateLoad }] = useUpdateParkByIdMutation()
    const [addNewTrail, { isLoading: addTrailLoad }] = useAddTrailToParkMutation()
    const [deleteTrailFromDB, { isLoading: deleteTrailLoad }] = useDeleteTrailFromParkMutation()
    //React useState
    const [submissionErr, setSubmissionErr] = useState(null)
    const [showTrailForm, setShowTrailForm] = useState(false)
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [loadMessage, setLoadMessage] = useState('')
    //Redux
    const trails = useSelector((state) => state.parkForm.trails)
    const trail = useSelector((state) => state.parkForm.trail)
    const dispatch = useDispatch()

    //React-router-dom
    const nav = useNavigate()

    const onSubmit = async (data) => {
        let res = {}
        if (!park) {
            setLoadMessage('Creating Park')
            res = await (createNewPark(data))
            if (res.error && res.error.status === 409) {
                console.log(res)
                setSubmissionErr({ ...res.error.data.park, message: 'This park is already listed. You can view the page by clicking the link below.' })
                return
            } else if (res.error) {
                console.log(res)
                return
            }
        } else {           
            setLoadMessage('Updating Park')
            res = await updatePark({ id: park.id, ...data })
        }
        setLoadMessage('Park Created Successfully')
        for (let trail of trails) {
            setLoadMessage(`Adding ${trail.name} to ${res.data.name} park`)
            trail = { ...trail, parkId: res.data.id }
            await addNewTrail(trail)
        }
       
        dispatch(resetForm())
        dispatch(closeForm())
        nav(`/parks/${res.data.id}`)

    }
    //For Google AutoComplete
    const autoCompleteRef = useRef()
    const inputRef = useRef()
    const options = {
        componentRestrictions: { country: 'US' },
        fields: ['address_components', "reviews", "name", 'formatted_phone_number', 'url', 'website'],
        types: ['park'],

    }



    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            setValue('name', place.name)
            if (place.address_components.length === 8) {
                setValue('streetAddress', `${place.address_components[0].long_name} ${place.address_components[1].long_name}`)
                setValue('city', place.address_components[3].long_name)
                setValue('state', place.address_components[5].short_name)
                setValue('zip', place.address_components[7].long_name)
            } else if (place.address_components.length === 7) {
                setValue('streetAddress', `${place.address_components[0].long_name} ${place.address_components[1].long_name}`)
                setValue('city', place.address_components[2].long_name)
                setValue('state', place.address_components[4].short_name)
                setValue('zip', place.address_components[6].long_name)
            } else if (place.address_components.length === 5) {

                setValue('streetAddress', ``)
                setValue('city', place.address_components[0].long_name)
                setValue('state', place.address_components[2].short_name)
                setValue('zip', place.address_components[4].long_name)

            } else {
                setValue('streetAddress', `${place.address_components[0].long_name} ${place.address_components[1].long_name}`)
                setValue('city', place.address_components[2].long_name)
                setValue('state', place.address_components[3].short_name)
                setValue('zip', place.address_components[5].long_name)
            }

            setValue('phone', place.formatted_phone_number)
            setValue('url', place.website)

        });

    }, [])





    return (
        <>
            {isLoading || updateLoad || addTrailLoad || deleteTrailLoad ? <Loading message={loadMessage} /> :

                <form onSubmit={handleSubmit(onSubmit)} className='px-5 max-w-[800px] mx-auto text-start'>
                    <div className='mt-3'>
                        <label htmlFor='parkSearch'
                            className="block text-sm font-medium leading-6 text-gray-900">Search For A Park</label>
                        <input id='parkSearch' ref={inputRef}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.streetAddress && <span>Required</span>}
                    </div>

                    {submissionErr && <p className=" mt-3 text-xs font-bold text-red-500 uppercase">{submissionErr.message}</p>}
                    {submissionErr && submissionErr.id && <NavLink className='text-indigo-950 underline' to={`/parks/${submissionErr.id}`}>VIEW {submissionErr.name} HERE</NavLink>}

                    <div className='mt-3'>
                        <label htmlFor='name' className="block text-sm font-medium leading-6 text-gray-900">Name of Park</label>
                        <input id='name' {...register("name", { required: true })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.name && <span>Required</span>}
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='streetAddress'
                            className="block text-sm font-medium leading-6 text-gray-900">Street Address</label>
                        <input id='streetAddress' {...register("streetAddress", { required: false })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.streetAddress && <span>Required</span>}
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='city' className="block text-sm font-medium leading-6 text-gray-900">City</label>
                        <input id='city' {...register("city", { required: true })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.city && <span>Required</span>}
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='state' className="block text-sm font-medium leading-6 text-gray-900">State</label>
                        <select id='state' {...register("state", { required: true })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        >
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                        {errors.state && <span>Required</span>}
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='zip' className="block text-sm font-medium leading-6 text-gray-900">Zipcode</label>
                        <input id='zip' {...register("zip", { required: false })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.zip && <span>Required</span>}
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='phone' className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                        <input id='phone' {...register("phone", { required: false })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.phone && <span>Required</span>}
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='url' className="block text-sm font-medium leading-6 text-gray-900">Url</label>
                        <input id='url' {...register("url", { required: false })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.url && <span>Required</span>}
                    </div>
                    <div className='justify-between columns-2 mt-3'>
                        <div className='w-full'>
                            <label htmlFor='parkingFee' className="block text-sm font-medium leading-6 text-gray-900">Parking Fee</label>
                            <input id='parkingFee' {...register("parkingFee", { required: false })}
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                            {errors.parkingFee && <span>Required</span>}
                        </div>
                        <div className='w-full '>
                            <label htmlFor='horseFee' className="block text-sm font-medium leading-6 text-gray-900">Riding Fee</label>
                            <input id='horseFee' type='number' {...register("horseFee", { required: false })}
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                            {errors.horseFee && <span>Required</span>}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <h3 className='font-bold text-lg'>Trails</h3>
                        <hr />
                        <div className=' flex hover:cursor-pointer hover:bg-indigo-100 w-[150px]  py-2 rounded' onClick={() => setShowTrailForm(!showTrailForm)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p className='font-bold uppercase'>Add Trail</p>
                        </div>
                        <div className=''>

                            {trails.length > 0 &&
                                <>
                                <h3 className='font-bold text-lg'>Adding Trails</h3>
                            {trails.map(trail => (
                                    <div className='flex flex-row-reverse justify-end items-end  shadow-md mb-2 ' key={trail.trailId}>
                                        <p className='font-bold tracking-widest text-lg'>{trail.name}: {trail.length} miles</p>
                                        <button onClick={() => dispatch(deleteTrail(trail))} type='button' className='mr-5  bg-red-500 p-1 rounded border '>X</button>
                                    </div>
                                    ))}
                                </>

                            }
                            {park &&
                                <>
                                    <h2 className='font-bold text-lg'>Current Trails</h2>
                                    {park.Trails.length > 0 && park.Trails.map(trail => (
                                        <div className='flex flex-row-reverse justify-end items-end  shadow-md mb-2 ' key={trail.id}>
                                            <p className='font-bold tracking-widest text-lg'>{trail.name}: {trail.length} miles</p>
                                            <button onClick={() => { setShowDeletePopup(true); dispatch(setTrail(trail)) }} type='button' className='mr-5  bg-red-500 p-1 rounded border '>X</button>
                                        </div>
                                    ))}
                                </>

                            }
                            <DeletePopup open={showDeletePopup} setOpen={setShowDeletePopup} subject={`${trail.name}`} onDelete={async () => await deleteTrailFromDB(trail.id)} />
                        </div>


                    </div>

                    <input type='submit' className='my-5 border py-2 px-6 rounded bg-indigo-800 text-white hover:bg-indigo-700 hover:cursor-pointer' />
                </form>
            }
            <Popup open={showTrailForm} setOpen={setShowTrailForm} title={"Add Trail"}><TrailForm setShow={setShowTrailForm} /></Popup>
        </>
    )
}