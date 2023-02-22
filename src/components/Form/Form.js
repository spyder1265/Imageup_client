import React, {useState} from "react";
import logo from '../../Assets/Logos/light logo.svg';
import {Link} from "react-router-dom";
import { motion} from 'framer-motion';
import axios from "axios";

const Form = () => {
    const [isLogin , setIsLogin ] = useState(true);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const validationErrors = [];

    const handleRegister = () => {
        axios
            .post('http://localhost:4000/register', {
                name : name,
                username: username,
                email: email,
                password: password
            })
            .then(response => {
                sessionStorage.setItem("authPassed", true);
                console.log(response);
                sessionStorage.setItem('userId' , response.data._id);
                window.location.reload();
            })
            .catch(error => {
                error = error.response.data.msg;
                validationErrors.push(error);
            });
    };

// send POST request to server to login user
    const login = () => {
        return axios.post('http://localhost:4000/login', {
            username,
            password
        })
            .then(response => {
                sessionStorage.setItem("authPassed", true);
                window.location.reload()
                sessionStorage.setItem('userId' , response.data.id)
                return response.data;
            })
            .catch(error => {
                error = error.response.data.msg;
                validationErrors.push(error);
            });
    };

    const handleSubmit = (event) => {
      event.preventDefault();

      if (isLogin) {
          if (!username) {
              validationErrors.push('Username is required');
          }
          if (!password) {
              validationErrors.push('Password is required');
          }
      }else{
          if (!username) {
              validationErrors.push('Username is required');
          }
          if (!password) {
              validationErrors.push('Password is required');
          }
          if (!email) {
              validationErrors.push('Email is required');
          } else if (!/\S+@\S+\.\S+/.test(email)) {
              validationErrors.push('Email is invalid');
          }
      }

        // If there are validation errors, set them and return early
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Submit the form
        if (isLogin) {
            login();
        } else {
            handleRegister();
        }

    };

    const changeFormType = () => {
        setIsLogin(!isLogin);
        setErrors([]);
    }



    const contentVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
    };



    return (
        <motion.div
            variants={contentVariants}
            className="flex form-container justify-center place-items-center h-screen w-screen bg-slate-200 ">
            <div className="p-10 pt-0 rounded-lg bg-slate-200 shadow-slate-700 shadow-2xl ">

                <div className="flex justify-center mt-4 mb-6">
                    <img src={logo} alt="logo" className="h-24 w-24 scale-150 "/>
                </div>

                <div className="flex justify-center">
                    <div className="flex justify-center pb-2 border-b-[2px] border-black w-36 mb-4">
                        <h3 className="text-xl font-bold">{isLogin ? 'Login' : 'Sign-up'}</h3>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="flex w-full mb-4 gap-2">
                            <input type="text" name="Name" value={name} onChange={event => setName(event.target.value) } placeholder="Name:" className="form-input focus:border-0 rounded h-10"/>
                        </div>
                    )}
                    <div className="flex w-full mb-4 gap-2">
                        <input type="text" name="username" value={username} onChange={event => setUsername(event.target.value) } placeholder="Username:" className="form-input focus:border-0 rounded h-10"/>
                    </div>

                    {!isLogin && (
                        <div className="flex w-full mb-4 gap-2">
                            <input type="email" name="Email" value={email} onChange={event => setEmail(event.target.value) } placeholder="me@me.com" className="form-email focus:border-0 rounded h-10"/>
                        </div>
                    )}
                    <div className="flex w-full mb-6 gap-2">
                        <input type="password" name="password" value={password} onChange={event => setPassword(event.target.value) } placeholder="*********" className="form-password focus:border-0 rounded h-10"/>
                    </div>
                    <div className="flex justify-center w-full mb-4 gap-2">
                        <button type='submit' className="bg-black hover:bg-gray-800 text-gray-50 px-4 py-1 rounded"> Submit </button>
                    </div>

                    <div className=" px-6 py-4 flex flex-col items-center">
                        <div className="flex justify-center space-x-4">
                            <button
                                type="button"
                                className="group bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition duration-200">
                                <span className="sr-only">Sign in with Facebook</span>
                                <i className="fab fa-facebook group-hover:animate-pulse group-active:animate-spin"></i>
                            </button>
                            <button
                                type="button"
                                className="group bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition duration-200">
                                <span className="sr-only">Sign in with Google</span>
                                <i className="fab fa-google group-hover:animate-pulse group-active:animate-spin"></i>
                            </button>
                            <button
                                type="button"
                                className="group bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition duration-200">
                                <span className="sr-only">Sign in with Twitter</span>
                                <i className="fab fa-twitter group-hover:animate-pulse group-active:animate-spin"></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex w-full p-2 flex-col mb-4 border-t border-black justify-center ">
                        <button type="button" className="py-2 text-[13px] h-8 text-indigo-500 hover:underline " onClick={()=>changeFormType()}>{isLogin ? " Don't have an account?" : "Already have an account"}</button>
                        {isLogin &&
                        <Link to="/" className="py-2 text-[11px] text-center h-8 text-indigo-500 hover:underline "> Forgot your password ?</Link>
                        }
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

export default Form;