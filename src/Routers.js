import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./components/login";
import Business from './components/Businesses';
import AddBusiness from "./components/Addbusiness";
import NewUser from "./components/Newuser"

const Routers = ()=>{
  return(
    <Routes>
      <Route path="/" element={<Business/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/addBusiness" element={<AddBusiness/>} />
      <Route path="/newUser" element={<NewUser/>} />
    </Routes>
  )
}







export default Routers