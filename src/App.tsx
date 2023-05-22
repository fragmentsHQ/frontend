import React from "react";
import { useAccount } from "wagmi";

import { Account, Connect, NetworkSwitcher } from "./components";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import BgImages from "./components/BgImages";

export function App() {
  const { address } = useAccount();

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
