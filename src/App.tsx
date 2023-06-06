import React from "react";
import { useAccount } from "wagmi";
// import { useAutoConnect } from "./useAutoConnect";
import { Route, Routes } from "react-router";
import Main from "./screens/Main";
import Balance from "./screens/Balance";
import Task from "./screens/Task";

const App = () => {
  const { address } = useAccount();

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="balance/" element={<Balance />} />
      <Route path="job/:jobId" element={<Task />} />
    </Routes>
  );
};

export default App;
