import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'


export default function DashboardSlideScreen({open, setOpen, title, description, children}) {
  return (
    <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={setOpen}>

        <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-y-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-y-full"
                    >
                        <Dialog.Panel className="pointer-events-auto relative w-screen  ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute right-5 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                    <button
                                        type="button"
                                        className="relative rounded-md text-gray-800 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="absolute -inset-2.5" />
                                        <span className="sr-only">Close panel</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div className="px-4 sm:px-6 pb-3">
                                    <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                        <p className='text-lg font-bold'>{title}</p>
                                        <p className='text-xs'>{description}</p>
                                    </Dialog.Title>

                                </div>
                                <hr />
                                <div className="relative  flex-1 px-4 sm:px-6">
                                   {children}
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </div>
    </Dialog>
</Transition.Root>
  )
}
