import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../../../Assets/Logos/light_logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewPassword = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const validationErrors = [];
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://54.185.56.193:4000/user/${userId}`
      );
      const username = response.data.username;
      setUsername(username);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Call function to get all images on component mount
    getUser().then(() => {});
    // eslint-disable-next-line
  }, []);

  const contentVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password) {
      validationErrors.push("Password is required");
    } else if (password.length < 8) {
      validationErrors.push("Password is less than 8 characters");
    } else if (password !== confirmPassword) {
      validationErrors.push("Passwords do not match");
    }

    // If there are validation errors, set them and return early
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        `http://54.185.56.193:4000/set-password`,
        {
          userId: userId,
          username: username,
          password: password,
        }
      );
      console.log(response.data.message);
      sessionStorage.setItem("authPassed", true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      variants={contentVariants}
      className='flex form-container justify-center place-items-center h-screen w-screen bg-slate-200 '
    >
      <div className='  p-10 pt-0 rounded-lg max-w-lg bg-slate-200 shadow-slate-700 shadow-2xl '>
        <div className='flex justify-center mt-4 mb-6'>
          <img src={logo} alt='logo' className='h-24 w-24 scale-150 ' />
        </div>

        <div className='flex max-w-[200px] text-center mb-6 gap-2'>
          <p className='font-bold break-words'>
            Please enter your new password
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='flex w-full mb-4 gap-2'>
            <input
              type='text'
              name='username'
              value={username}
              readOnly={true}
              onChange={null}
              placeholder='Username'
              className='form-input focus:border-0 rounded h-10'
            />
          </div>
          <div className='flex w-full mb-4 gap-2'>
            <input
              type='password'
              name='New password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder='New password'
              className='form-input focus:border-0 rounded h-10'
            />
          </div>
          <div className='flex w-full mb-4 gap-2'>
            <input
              type='password'
              name='Confirm password'
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder='Confirm password'
              className='form-input focus:border-0 rounded h-10'
            />
          </div>

          <div className='flex justify-center w-full mb-4 gap-2'>
            <button
              type='submit'
              className='bg-black hover:bg-gray-800 text-gray-50 px-4 py-1 rounded'
            >
              {" "}
              Submit{" "}
            </button>
          </div>
        </form>
        {errors.length !== 0 && (
          <div className='max-w-[200px]  text-center'>
            {errors.map((error, index) => (
              <div key={index} className='text-red-500 break-words'>
                {error}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NewPassword;
