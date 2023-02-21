import React from "react";

const Logout = () => {

    const handleLogout = () => {
        sessionStorage.clear()
        window.location.reload();
    }


  return(
      <>
          <button className="w-20 h-20 text-2xl text-gray-900 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-50" onClick={()=>handleLogout()}>
              <i className="fa-solid fa-right-from-bracket"></i>
          </button>
      </>
  )
}

export default Logout;