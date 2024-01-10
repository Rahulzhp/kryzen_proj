import React from 'react'
import { Routes, Route } from "react-router-dom"

import Home from './Home'
import Show from './Show'
import Formdatacont from "./Formdatacont"


const Allroutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/preivew' element={<Formdatacont />}></Route>
            <Route path='/show' element={<Show />}></Route>
        </Routes>
    )
}

export default Allroutes