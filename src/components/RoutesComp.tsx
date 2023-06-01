import React from 'react'
import { Route, Routes } from 'react-router'
import { App } from '../App'
import JobDetails from "../components/JobDetails"

const RoutesComp = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="job/:jobId" element={<JobDetails />} />
        </Routes>
    )
}

export default RoutesComp