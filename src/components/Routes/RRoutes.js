import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Form from "../Form/Form";
import Home from "../Home/Home";


const RRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route  path="Form"  element={<Form/>}/>
                <Route path="/" element={sessionStorage.getItem("authPassed")?<Home/>:<Form/>}/>
            </Routes>
        </Router>
    )
}

export default  RRoutes;