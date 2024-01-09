import React from 'react'
import { useForm } from "react-hook-form"

export default function AddParkForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => console.log(data)
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='px-5 max-w-[800px] mx-auto text-start'>
                <div className='mt-3'>
                    <label htmlFor='name' className="block text-sm font-medium leading-6 text-gray-900">Name of Park</label>
                    <input id='name' {...register("name", { required: true })}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                    {errors.name && <span>Required</span>}
                </div>
                <div className='mt-3'>
                    <label htmlFor='streetAddress' className="block text-sm font-medium leading-6 text-gray-900">Street Address</label>
                    <input id='streetAddress'{...register("streetAddress", { required: false })}
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
                    <label htmlFor='phoneNumber' className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                    <input id='phoneNumber' {...register("phoneNumber", { required: false })}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                    {errors.phoneNumber && <span>Required</span>}
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
                        <label htmlFor='ridingFee' className="block text-sm font-medium leading-6 text-gray-900">Riding Fee</label>
                        <input id='ridingFee' {...register("ridingFee", { required: false })}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.ridingFee && <span>Required</span>}
                    </div>
                </div>

                <div className='mt-3'>
                    <label htmlFor='description' className="block text-sm font-medium leading-6 text-gray-900">Description of Park</label>
                    <textarea {...register("description")} rows={10}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    ></textarea>
                </div>

                <input type='submit' className='my-5 border py-2 px-6 rounded bg-indigo-800 text-white hover:bg-indigo-700 hover:cursor-pointer' />
            </form>
        </>
    )
}