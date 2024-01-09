import React from 'react'
import { Routes, Route } from "react-router-dom"
import FormData_Cont from './FormData_Cont'
import Home from './Home'


const Allroutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/form' element={<FormData_Cont />}></Route>
        </Routes>
    )
}

export default Allroutes