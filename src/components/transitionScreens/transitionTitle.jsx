import { Dialog } from '@headlessui/react'
import React from 'react'

export default function TransitionTitle({ title, children }) {
    return (
        <Dialog.Title className="flex flex-col justify-start items-start text-base font-semibold leading-6 text-gray-900">
            <p className='text-lg font-bold'>{title}</p>
            {children}
        </Dialog.Title>
    )
}
