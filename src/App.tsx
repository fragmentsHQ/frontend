import React from "react";
import { useAccount } from "wagmi";

import Navbar from "./components/Navbar";
import Main from "./components/Main";
import BgImages from "./components/BgImages";
import { useAutoConnect } from "./useAutoConnect";

export function App() {
  const { address } = useAccount();
  useAutoConnect();

  return (
    <>
      <Navbar />
      <Main />
      <BgImages />
      {/* <Connect />
      <p>HI Testing</p>

      {address && (
        <>
          <Account />
          <NetworkSwitcher />
        </>
      )} */}
    </>
  );
}
