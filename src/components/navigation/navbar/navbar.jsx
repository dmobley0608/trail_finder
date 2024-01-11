import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { useGetUserQuery, useLazyLogoutQuery } from '../../../redux/userAPI'




export default function Navbar() {
    const { data: user, refetch } = useGetUserQuery()
    const [trigger] = useLazyLogoutQuery()

    const signout = async()=>{
       trigger().unwrap();   
       refetch()    
    }

    return (
        <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-10 ">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="mx-auto h-10 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt="Trail Finder"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block   ">
                                    <div className="flex space-x-4 items-end  mt-5 ">
                                        <NavLink to='/'
                                            className={({ isActive }) => isActive ? 'sm:text-gray-100 sm:border-b-2  hover:bg-gray-700  px-6 sm:px-1 ' : ' text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3  font-medium'}
                                        >Home</NavLink>

                                    </div>

                                </div>

                            </div>
                            {/* ***Only show if user is logged in*** */}
                            {user ? <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown  */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                <NavLink to={`/user/${user.id}/dashboard`}
                                                    className={({ isActive }) => isActive ? 'sm:text-gray-800 sm:border-b-2  hover:bg-gray-500 font-bold  px-6 sm:px-1' : ' text-gray-800 hover:bg-gray-700 hover:text-white block rounded-md px-3'}
                                                >Dashboard</NavLink>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <button
                                                    onClick={() => { signout() }}
                                                    className={'block px-4 py-2 text-sm text-gray-700 mx-auto'}
                                                >
                                                    Sign out
                                                </button>

                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                            </div>
                                :
                                <div>
                                    <NavLink to="/signin"
                                        className={`hidden sm:flex ${({ isActive }) => isActive ? 'bg-blue-500 sm:bg-transparent text-black sm:text-gray-100 sm:border-b-2 sm:pb-1  px-6 sm:px-1' : ' text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2  font-medium'}`}>
                                        Sign In/Register
                                    </NavLink>
                                </div>

                            }
                        </div>

                    </div>

                    <Disclosure.Panel className="sm:hidden ">
                        <div className="space-y-1 px-2 pb-3 pt-2 border">
                            <Disclosure.Button as={NavLink} to="/"
                                className={`${({ isActive }) => isActive ? 'bg-blue-200 text-black rounded px-6' : ' text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'}`}>
                                Home

                            </Disclosure.Button>


                            {!user && <Disclosure.Button as={NavLink} to="/signin"
                                className={({ isActive }) => isActive ? 'bg-blue-200 text-black rounded px-6' : ' text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'}>
                                Sign In/Register

                            </Disclosure.Button>
                            }
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
