type Tokens = {
  name: string;
};

type Category = "One Time" | "Recurring";

type Options = {
  value: string;
  label: string;
};

type AppModes = "Auto Pay" | "xStream";
type GasModes = "Forward" | "Gas Account";


export { Tokens, Category, Options, AppModes, GasModes };
