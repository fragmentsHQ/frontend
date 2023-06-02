import React from "react";
import { useAccount } from "wagmi";
import { useAutoConnect } from "./useAutoConnect";
import { Route, Routes } from 'react-router'
import Main from './components/Main';
import JobDetails from './components/JobDetails';

const App = () => {
  const { address } = useAccount();
  useAutoConnect();
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="job/:jobId" element={<JobDetails />} />
    </Routes>
  )
}

export default App
