import React from 'react'
import { Routes, Route } from "react-router-dom"
import FormData_Cont from './FormData_Cont'
import Home from './Home'
import Reivew from './Reivew'

const Allroutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/sell' element={<FormData_Cont />}></Route>
            <Route path='/profile' element={<Reivew />}></Route>
        </Routes>
    )
}

export default Allroutes