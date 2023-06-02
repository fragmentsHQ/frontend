import React from "react";
import { useAccount } from "wagmi";
import { useAutoConnect } from "./useAutoConnect";
import { Route, Routes } from "react-router";
import Main from "./screens/Main";
import JobDetails from "./components/JobDetails";
import Balance from "./screens/Balance";

const App = () => {
  const { address } = useAccount();
  useAutoConnect();
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="balance/" element={<Balance />} />
      <Route path="job/:jobId" element={<JobDetails />} />
    </Routes>
  );
};

export default App;
