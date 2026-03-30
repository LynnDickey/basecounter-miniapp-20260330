"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const connector = connectors.find((item) => item.ready) ?? connectors[0];

  if (isConnected && address) {
    return (
      <button className="button ghost" type="button" onClick={() => disconnect()}>
        {shortAddress(address)} · Disconnect
      </button>
    );
  }

  return (
    <button
      className="button primary"
      type="button"
      disabled={!connector || isPending}
      onClick={() => connector && connect({ connector })}
    >
      {isPending ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
