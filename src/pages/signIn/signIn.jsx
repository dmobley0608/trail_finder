import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  useLoginMutation } from '../../redux/userAPI'
import Loading from '../loading/loading';
import logo from '../../static/images/trailFinderLogo.png'
export default function SignIn() {
  const [login, result] = useLoginMutation();
  const [userInfo, setUserInfo] = useState({})
  const [error, setError] = useState()
  const nav = useNavigate()
 

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await login(userInfo)  
   
    if (res.error) {
      setError(res.error.data)     
    }else{
      nav('/')
      return
    }
    
  }
  return (
    <>
      {
        result.isLoading ? <Loading /> :
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-[150px] w-auto"
                src={logo}
                alt="Trail Finder"
              />
              <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <p className='text-sm text-red-500 font-bold'>{error}</p>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={(e) => onSubmit(e)} method="POST">
                <div >
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
                      onChange={(e) => { setUserInfo({ ...userInfo, email: e.target.value }) }}
                    />
                  </div>
                </div>

                <div>
                  <div className="">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>

                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => { setUserInfo({ ...userInfo, password: e.target.value }) }}
                    />
                  </div>
                </div>
                <div className="text-sm ">
                  <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Create An Account Here
                </Link>
              </p>

            </div>
          </div>
      }
    </>
  )
}
