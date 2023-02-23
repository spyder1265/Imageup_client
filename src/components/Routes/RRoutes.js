import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Form from "../Form/Form";
import Home from "../Home/Home";
import PasswordReset from "../Form/PasswordReset/PasswordReset";
import TwoFactorAuthentication from "../Form/TwoFactorAuthentication/TwoFactorAuthentication";
import NewPassword from "../Form/NewPassword/NewPassword";


const RRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route  path="Form"  element={<Form/>}/>
                <Route  path="Form/PasswordReset"  element={<PasswordReset/>}/>
                <Route  path="Form/PasswordReset/NewPass"  element={<NewPassword/>}/>
                <Route  path="Form/PasswordReset/TwoFA"  element={sessionStorage.getItem("2fa")?<TwoFactorAuthentication/>:() => window.location.replace("http://localhost:3000/Form")}/>
                <Route path="/" element={sessionStorage.getItem("authPassed")?<Home/>: <Form/>}/>
            </Routes>
        </Router>
    )
}

export default  RRoutes;