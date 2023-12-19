import React, { useEffect, useRef, useState } from "react";
import logo from "../../../Assets/Logos/light_logo.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TwoFactorAuthentication() {
  const [pin, setPin] = useState("");
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const navigate = useNavigate();

  const handlePinChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1 && /^\d*$/.test(value)) {
      setPin((prevPin) => {
        const newPin = prevPin.split("");
        newPin[index] = value;
        const updatedPin = newPin.join("");
        if (updatedPin.length === 4) {
          // auto-submit form when 4 digits are entered
          setTimeout(() => {
            e.target.form.requestSubmit();
          }, 0);
        }
        return updatedPin;
      });

      if (value.length > 0) {
        inputRefs[index + 1]?.current?.focus();
      }
    }
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (pin.length === 4) {
      try {
        const res = await axios.post(
          "http://http://ec2-54-185-56-193.us-west-2.compute.amazonaws.com/verify-code",
          {
            code: pin,
          }
        );
        sessionStorage.setItem("userId", res.data.userId);
        navigate("/Form/PasswordReset/NewPass");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 70 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.5 } },
  };

  const goodRequest = () => {
    if (!sessionStorage.getItem("2fa")) {
      navigate("/Form/PasswordReset");
    } else {
      return Promise.resolve();
    }
  };

  useEffect(() => {
    // check if user user the right path to get here
    goodRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      variants={contentVariants}
      className='flex form-container justify-center place-items-center h-screen w-screen bg-slate-200 '
    >
      <div className='  p-10 pt-0 rounded-lg max-w-lg bg-slate-200 shadow-slate-700 shadow-2xl '>
        <div className='flex justify-center mt-4 mb-6'>
          <img src={logo} alt='logo' className='h-24 w-24 scale-150 ' />
        </div>
        <div className='flex justify-center mt-6 mb-6'>
          <p className='font-bold'>Please enter the code we sent you.</p>
        </div>
        <form onSubmit={handlePinSubmit}>
          <div className='flex justify-center'>
            {inputRefs.map((ref, index) => (
              <input
                key={index}
                ref={ref}
                type='text'
                maxLength='1'
                className='mx-2 text-center rounded-lg focus:outline-none ring-1 ring-black ring-opacity-5 w-12 h-14 font-mono text-2xl'
                value={pin[index] || ""}
                onChange={(e) => handlePinChange(e, index)}
              />
            ))}
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default TwoFactorAuthentication;
