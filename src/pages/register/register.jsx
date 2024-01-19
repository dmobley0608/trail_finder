import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Loading from '../loading/loading'
import logo from '../../static/images/trailFinderLogo.png'
import { useRegisterNewUserMutation } from '../../redux/backendApi'
export default function Register() {
    const [user, setUser] = useState({})
    const [error, setError] = useState({ generalError: '', passwordError: '' })
    const [registerUser, result] = useRegisterNewUserMutation()

    const nav = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        if (user.confirmPassword !== user.password) {
            setError({ ...error, passwordError: "PASSWORDS MUST MATCH" })
            return
        } else if (user.password.length < 8) {
            setError({ ...error, passwordError: "PASSWORD MUST BE AT LEAST 8 CHARACTERS LONG" })
            return
        }
        const res = await registerUser(user)

        if (res.error) {
            setError({ ...error, generalError: "UH-OH! YOU MAY ALREADY HAVE AN ACCOUNT! PLEASE LOGIN OR TRY AGAIN LATER!" })
            return
        } else {
            nav(`/user/${res.data.id}/dashboard`)
        }

    }


    return (
        <>
            {result.isLoading ? <Loading /> :
                <div className='px-3'>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">                       
                            <img
                                className="mx-auto h-[150px] w-auto"
                                src={logo}
                                alt="Trail Finder"
                            />
                            <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Let's Create an Account!
                            </h2>
                        </div>
                        <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-2" onSubmit={(e) => onSubmit(e)} method="POST">
                                <p className='text-sm text-red-500 drop-shadow font-bold'>{error.generalError}</p>
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                        First Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => { setUser({ ...user, firstName: e.target.value }) }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="LastName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Last Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="LastName"
                                            name="LastName"
                                            type="text"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => { setUser({ ...user, lastName: e.target.value }) }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <p className='text-xs text-red-500 font-bold'>{error.passwordError}</p>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="off"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirm Password
                                    </label>

                                    <div className="mt-2">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            autoComplete='off'
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => { setUser({ ...user, confirmPassword: e.target.value }) }}
                                        />
                                    </div>
                                </div>


                                <div>
                                    <button
                                        type="submit"
                                        className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Create Account
                                    </button>
                                </div>
                                <hr />
                            </form>
                            <p className="mt-1 text-center text-sm text-gray-500">
                                Already Have An Account?{' '}
                                <Link to="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Login Here
                                </Link>
                            </p>

                        </div>
                    </div>
            }
                </>
    )
}
