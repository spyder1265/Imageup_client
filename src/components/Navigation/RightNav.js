import React, {Fragment, useCallback, useEffect, useState} from "react";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import Logout from "../Logout/Logout";


const RightNav = (callback, deps) => {
    const element = document.documentElement;
    const [Theme,setTheme] = useState(
        localStorage.getItem('Theme') ? localStorage.getItem('Theme') : 'system'
    );
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const [opened,setOpened] = useState(false);


    const setIsThemeSet = () => {
        setOpened(true);
    }

    const closeIsThemeSet = () => {
        setOpened(false);
    }

    const themeChange = (option) => {
        switch (option){
            case 'dark':
                setTheme('dark');
                localStorage.setItem('icon', 'fa fa-moon text-amber-200');
                break;
            case 'light':
                setTheme('light');
                localStorage.setItem('icon', 'fa fa-sun text-orange-300');
                break;
            default:
                setTheme('system');
                localStorage.setItem('icon', 'fa fa-display text-cyan-600');
                break;
        }
    }


    const options = () => [
        {
            icon: 'fa fa-sun',
            text:'light',
            style:'text-amber-200 hover:text-amber-400 ',
        },
        {
            icon: 'fa fa-moon',
            text:'dark',
            style:'text-amber-300 hover:text-amber-400 ',
        },
        {
            icon: 'fa fa-display',
            text:'system',
            style:'text-amber-200 hover:text-amber-400 ',
        }
    ]



    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onWindowMatch = useCallback(() => {
        if(localStorage.Theme === 'dark' || (!('Theme' in localStorage) && darkQuery.matches) ){
            element.classList.add('dark');
        }
        else{
            element.classList.remove('dark');
        }
    })


    onWindowMatch();




    useEffect(()=> {
        switch (Theme) {
            case 'dark':
                element.classList.add('dark');
                localStorage.setItem('Theme','dark');
                localStorage.setItem('icon', 'fa fa-moon text-amber-200 hover:text-amber-400');
                break;
            case 'light':
                element.classList.remove('dark');
                localStorage.setItem('Theme','light');
                localStorage.setItem('icon', 'fa fa-sun text-orange-300 hover:text-orange-500');
                break
            default:
                localStorage.removeItem('Theme');
                localStorage.setItem('Theme','system');
                localStorage.setItem('icon', 'fa fa-display text-cyan-600 hover:text-cyan-500 ');
                onWindowMatch();
                break
        }


    },[Theme, element.classList, onWindowMatch])


    darkQuery.addEventListener("change",(e)=>{
        if (!('Theme' in localStorage)){
            if (e.matches){
                element.classList.add('dark');
            }
            else {
                element.classList.remove('dark');
            }
        }
    })

  return(
      <div className="sidenav">
          <Disclosure as="nav" className="bg-transparent border-b z-10 w-full dark:bg-gray-900">
              <>
                  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                      <div className="relative flex h-16 items-center justify-between">
                          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                              <div className="flex flex-shrink-0 items-center">
                              </div>
                          </div>


                          <Menu as="div" className="relative ml-3 mr-1">

                              <div>
                                  <Menu.Button className="flex dark:text-white focus:outline-none text-2xl " onClick={!opened?()=>setIsThemeSet():()=>closeIsThemeSet()}>
                                      <span className="sr-only">Change theme</span>
                                      <i className={localStorage.getItem('icon')} />
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
                                  <Menu.Items className="absolute flex justify-center right-0 z-10 mt-6 w-42 px-2 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 focus:outline-none ring-black ring-opacity-5">
                                      <Menu.Item>

                                          <>
                                              {options().map((option =>(
                                                  <button
                                                      key={option.text}
                                                      onClick={()=>themeChange(option.text)}
                                                      className={`w-8 h-8 leading-9 text-xl rounded-full  m-1
                                                        ${Theme === option.text ? "text-sky-500 " : "hover:text-gray-500 "}`
                                                      }>
                                                      <i className={option.icon}></i>
                                                  </button>
                                              )))}
                                          </>
                                      </Menu.Item>
                                  </Menu.Items>
                              </Transition>
                          </Menu>
                          <div>
                            <Logout/>
                          </div>
                      </div>
                  </div>
              </>
          </Disclosure>
      </div>
  )
}

export default RightNav;