import React from 'react'
import { Route, Routes } from 'react-router'
import { App } from '../App'

const RoutesComp = () => {
    return (
        <Routes>
            <Route exact path="/" element={<App />} />
        </Routes>
    )
}

export default RoutesComp