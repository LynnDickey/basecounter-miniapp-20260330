import { Attribution } from "ox/erc8021";
import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { base } from "wagmi/chains";

export const DATA_SUFFIX = Attribution.toDataSuffix({
  // Replace this builder code with your real value before production launch.
  codes: ["BUILDER_CODE_PLACEHOLDER"],
});

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [injected({ target: "metaMask" }), injected({ target: "coinbaseWallet" }), injected()],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});
