import React, { useState, useRef } from 'react';
import logo from "../../../Assets/Logos/light_logo.svg";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";

function TwoFactorAuthentication() {
    const [pin, setPin] = useState('');
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];
    const navigate = useNavigate();



    const handlePinChange = (e, index) => {
        const value = e.target.value;
        if (value.length <= 1 && /^\d*$/.test(value)) {
            setPin((prevPin) => {
                const newPin = prevPin.split('');
                newPin[index] = value;
                const updatedPin = newPin.join('');
                if (updatedPin.length === 4) { // auto-submit form when 4 digits are entered
                    setTimeout(() => {
                        e.target.form.requestSubmit();
                        setPin('')
                        inputRefs[0]?.current?.focus()
                    }, 0);
                }
                return updatedPin;
            });

            if (value.length > 0) {
                inputRefs[index + 1]?.current?.focus();
            }
        }
    };


    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pin.length === 4) {
            console.log('Submitting PIN:', pin); // replace with actual submit logic
            sessionStorage.clear();
            navigate('/Form/PasswordReset/NewPass');
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, x: 70 },
        visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.5 } },
    };

    if(sessionStorage.getItem('2fa')){
        return (
            <motion.div
                variants={contentVariants}
                className="flex form-container justify-center place-items-center h-screen w-screen bg-slate-200 ">
                <div className="  p-10 pt-0 rounded-lg max-w-lg bg-slate-200 shadow-slate-700 shadow-2xl ">

                    <div className="flex justify-center mt-4 mb-6">
                        <img src={logo} alt="logo" className="h-24 w-24 scale-150 "/>
                    </div>
                    <div className="flex justify-center mt-6 mb-6">
                        <p className="font-bold">Please enter the code we sent you.</p>
                    </div>
                    <form onSubmit={handlePinSubmit}>
                        <div className="flex justify-center">
                            {inputRefs.map((ref, index) => (
                                <input
                                    key={index}
                                    ref={ref}
                                    type="text"
                                    maxLength="1"
                                    className="mx-2 text-center rounded-lg focus:outline-none ring-1 focus:outline-none ring-black ring-opacity-5 w-12 h-14 font-mono text-2xl"
                                    value={pin[index] || ''}
                                    onChange={(e) => handlePinChange(e, index)}
                                />
                            ))}
                        </div>
                    </form>

                </div>
            </motion.div>
        );
    }else {
        navigate('/Form/PasswordReset');
    }
}

export default TwoFactorAuthentication;
