import { Attribution } from "ox/erc8021";
import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { base } from "wagmi/chains";

export const DATA_SUFFIX = Attribution.toDataSuffix({
  // ERC-8021 Builder Code attribution injection.
  codes: ["bc_c144u0dv"],
});

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [injected()],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});
