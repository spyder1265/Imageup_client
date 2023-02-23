import React from "react";
import {useNavigate} from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.clear()
        navigate('/')
    }


  return(
      <>
          <button className="w-20 h-20 text-2xl text-gray-400 hover:text-gray-100 dark:text-gray-300 dark:hover:text-gray-50" onClick={()=>handleLogout()}>
              <i className="fa-solid fa-right-from-bracket"></i>
          </button>
      </>
  )
}

export default Logout;