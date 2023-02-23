import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Form from "../Form/Form";
import Home from "../Home/Home";
import PasswordReset from "../Form/PasswordReset/PasswordReset";
import TwoFactorAuthentication from "../Form/TwoFactorAuthentication/TwoFactorAuthentication";
import NewPassword from "../Form/NewPassword/NewPassword";


const RRoutes = () => {
    const [authPassed, setAuthPassed] = useState(false);

    useEffect(() => {
        setAuthPassed(sessionStorage.getItem("authPassed") === "true");
    }, []);


    return (
        <Router>
            <Routes>
                <Route  path="Form"  element={<Form/>}/>
                <Route  path="Form/PasswordReset"  element={<PasswordReset/>}/>
                <Route  path="Form/PasswordReset/NewPass"  element={<NewPassword/>}/>
                <Route  path="Form/PasswordReset/TwoFA"  element={<TwoFactorAuthentication/>}/>
                <Route
                    path="/"
                    element={authPassed ? <Home /> : <Form />}
                />>
            </Routes>
        </Router>
    )
}

export default  RRoutes;