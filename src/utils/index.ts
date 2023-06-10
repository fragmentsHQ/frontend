import * as chainList from "wagmi/chains";

const getChainNameFromID = (chainID) => {
  const chain = Object.keys(chainList).find(
    (chain) => String(chainList[chain].id) === chainID
  );

  console.log("here curr chain: ", chain, chainID);
  return chainList[chain] ? chainList[chain].name : "";
};

export { getChainNameFromID };
