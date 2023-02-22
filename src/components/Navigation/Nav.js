/* eslint-disable */
import React from 'react'
import { Disclosure } from '@headlessui/react'
import {Link} from "react-router-dom";
import Logout from "../Logout/Logout";
import logo from "../../Assets/Logos/Dark Logo.svg"

export default function Nav() {


    return (
            <Disclosure as="nav" className=" border-b basis-[5rem] z-10 w-full bg-black">
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-20 overflow-hidden items-center justify-between">
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start phone:justify-start phone:pl-4">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to="/">
                                        <img
                                            className="hidden invisible h-8 w-auto lg:hidden"
                                            src={logo}
                                            alt="Your Company"
                                        />
                                        <img
                                            className=" h-24 w-auto "
                                            src={logo}
                                            alt="Your Company"
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="">
                                <Logout/>
                            </div>

                        </div>
                    </div>
                </>
            </Disclosure>
    )
}
