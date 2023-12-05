import React, {useState} from "react";
import {motion} from "framer-motion";
import logo from "../../../Assets/Logos/light_logo.svg";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const PasswordReset = () => {
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState([]);
    const validationErrors = [];
    const navigate = useNavigate();




    const contentVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
    };



    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!username) {
            validationErrors.push('Username is required');
        }


        // If there are validation errors, set them and return early
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await axios.post('https://image-up.onrender.com/reset-password', {username});
            // console.log(res.data); // do something with the response, e.g. show a success message
            sessionStorage.setItem('2fa', true);
            navigate('/Form/PasswordReset/TwoFA');
        } catch (err) {
            console.log(err.response.data); // handle the error, e.g. show an error message
        }


    }

  return(
      <motion.div
          variants={contentVariants}
          className="flex form-container justify-center place-items-center h-screen w-screen bg-slate-200 ">
          <div className="  p-10 pt-0 rounded-lg max-w-lg bg-slate-200 shadow-slate-700 shadow-2xl ">

              <div className="flex justify-center mt-4 mb-6">
                  <img src={logo} alt="logo" className="h-24 w-24 scale-150 "/>
              </div>

              <div className="flex justify-center">
                  <div className="flex justify-center pb-2 border-b-[2px] border-black w-36 mb-4">
                      <h3 className="text-lg font-bold"> Password Reset </h3>
                  </div>
              </div>

              <div className="flex w-full mb-6 gap-2">
                  <p className="font-bold">
                      Please enter your username
                  </p>
              </div>

              <form onSubmit={handleSubmit}>

                  <div className="flex w-full mb-4 gap-2">
                      <input type="text" name="username" value={username} onChange={event => setUsername(event.target.value) } placeholder="Username:" className="form-input focus:border-0 rounded h-10"/>
                  </div>


                  <div className="flex justify-center w-full mb-4 gap-2">
                      <button type='submit' className="bg-black hover:bg-gray-800 text-gray-50 px-4 py-1 rounded"> Submit </button>
                  </div>


                  <div className="flex w-full p-2 flex-col mb-4 border-t border-black justify-center ">
                          <Link to="/Form" className="py-2 text-[13px] text-center h-8 text-indigo-500 hover:underline "> Go back to the form ? </Link>
                  </div>
              </form>
              {errors !== [null] &&
                  <div className="w-full  text-center">
                      {errors.map((error, index) => (
                          <div key={index} className="text-red-500">{error}</div>
                      ))}
                  </div>
              }

          </div>
      </motion.div>
  )
}

export default PasswordReset
