/* eslint-disable */
import React from 'react'
import { Disclosure } from '@headlessui/react'
import {Link} from "react-router-dom";
// import Logout from "../Logout/Logout";

export default function Nav() {





    return (
            <Disclosure as="nav" className="bg-transparent border-b z-10 w-full dark:bg-gray-900">
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to="/">
                                        <img
                                            className="hidden invisible h-8 w-auto lg:hidden"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                        <img
                                            className="hidden invisible h-8 w-auto lg:hidden"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </>
            </Disclosure>
    )
}
