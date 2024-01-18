import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch} from 'react-redux'
import { addTrail } from '../../redux/parkFormSlice'

export default function TrailForm({setShow}) {
    const dispatch = useDispatch()
   
    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const onSubmit = (data) => {        
      dispatch(addTrail({...data}))
    setShow(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=''>
            <div className='mt-3'>
                <label htmlFor='name' className="block text-sm font-medium leading-6 text-gray-900">Name of Trail</label>
                <input id='name'  {...register("name", { required: true })}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {errors.name && <span className='text-red-500 text-xs font-semibold uppercase'>Required</span>}
            </div>
            <div className='mt-3'>
                <label htmlFor='color' className="block text-sm font-medium leading-6 text-gray-900">Color of Trail</label>
                <input id='color'  {...register("color")}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
            </div>
            <div className='mt-3'>
                <label htmlFor='difficulty' className="block text-sm font-medium leading-6 text-gray-900">Trail Difficulty</label>
                <select id='difficulty'  {...register("difficulty")}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                    <option value='EASY'>EASY</option>
                    <option value='MODERATE'>MODERATE</option>
                    <option value='CHALLENGING'>CHALLENGING</option>
                    <option value='RIGOROUS'>RIGOROUS</option>
                </select>
            </div>
            <div className='mt-3'>
                <label htmlFor='trailLength' className="block text-sm font-medium leading-6 text-gray-900">Length of Trail</label>
                <input id='trailLength' type='number' min='.01' step='.01' max='100'  {...register("length", { required: true })}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {errors.length && <span className='text-red-500 text-xs font-semibold uppercase'>Required</span>}
            </div>
            <input  type='submit' value="Add Trail" className='my-5 border py-2 px-6 rounded bg-indigo-800 text-white hover:bg-indigo-700 hover:cursor-pointer' />
        </form>
    )
}
