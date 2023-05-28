import React, { createContext, useState } from "react";

interface SourceData {
  sourceChain: string;
  sourceToken: string;
  appMode: "Auto Pay" | "xStream";
}

const SourceContext = createContext(undefined);

const SourceContextWrapper = ({ children }) => {
  const [sourceData, setSourceData] = useState<SourceData>({
    sourceChain: "",
    sourceToken: "",
    appMode: "Auto Pay",
  });
  return (
    <SourceContext.Provider value={{ sourceData, setSourceData }}>
      {children}
    </SourceContext.Provider>
  );
};

export default SourceContextWrapper;
export { SourceContext };
