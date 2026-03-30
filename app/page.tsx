"use client";

import { useMemo, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { base } from "wagmi/chains";
import { BottomNav } from "@/components/BottomNav";
import { CounterHeader } from "@/components/CounterHeader";
import { CounterPanel } from "@/components/CounterPanel";
import { IncreaseActionCard } from "@/components/IncreaseActionCard";
import { StatusChip } from "@/components/StatusChip";
import { WalletButton } from "@/components/WalletButton";
import { useBaseCounter } from "@/hooks/useBaseCounter";
import { useTrackedBaseCounter } from "@/hooks/useTrackedBaseCounter";

type UiStatus = {
  tone: "idle" | "loading" | "success" | "error";
  text: string;
};

const DEFAULT_STATUS: UiStatus = {
  tone: "idle",
  text: "Connect wallet and start counting your onchain actions.",
};

export default function HomePage() {
  const { address, isConnected, chainId } = useAccount();
  const publicClient = usePublicClient({ chainId: base.id });
  const { countLabel, isLoading, refetch } = useBaseCounter(address);
  const { increaseTracked, isPending, error, reset } = useTrackedBaseCounter();

  const [status, setStatus] = useState<UiStatus | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [lastSuccessHash, setLastSuccessHash] = useState<`0x${string}` | undefined>();

  const wrongChain = useMemo(() => {
    return isConnected && chainId !== base.id;
  }, [chainId, isConnected]);

  const visibleStatus = useMemo<UiStatus>(() => {
    if (!isConnected) return DEFAULT_STATUS;
    if (wrongChain) return { tone: "error", text: "Please switch to Base Mainnet (8453)." };
    if (status) return status;
    if (error) return { tone: "error", text: error.message.slice(0, 160) };
    return { tone: "idle", text: "Ready. Each click creates one onchain record." };
  }, [error, isConnected, status, wrongChain]);

  async function onIncrease() {
    if (!isConnected || wrongChain || !publicClient) return;

    setStatus({ tone: "loading", text: "Waiting for wallet signature..." });
    reset();

    try {
      const txHash = await increaseTracked();
      setStatus({ tone: "loading", text: `Tx submitted: ${txHash.slice(0, 10)}...` });
      setIsConfirming(true);
      await publicClient.waitForTransactionReceipt({ hash: txHash });
      setLastSuccessHash(txHash);
      setStatus({ tone: "success", text: `Transaction confirmed: ${txHash.slice(0, 10)}...` });
      await refetch();
    } catch (increaseError) {
      const message =
        increaseError instanceof Error ? increaseError.message : "Unable to submit transaction.";
      setStatus({ tone: "error", text: message.slice(0, 160) });
    } finally {
      setIsConfirming(false);
    }
  }

  return (
    <main className="app-shell">
      <CounterHeader />

      <section className="card wallet-card">
        <div>
          <p className="panel-label">Wallet Status</p>
          <p className="muted">
            {isConnected ? `Connected on chain ${chainId}` : "Disconnected"}
          </p>
        </div>
        <WalletButton />
      </section>

      <CounterPanel
        address={address}
        countLabel={countLabel}
        isLoading={isLoading}
        animateKey={`${countLabel}-${address ?? "none"}`}
      />

      <IncreaseActionCard
        disabled={!isConnected || wrongChain || isPending || isConfirming}
        loading={isPending || isConfirming}
        onIncrease={onIncrease}
        lastTxHash={lastSuccessHash}
      />

      <StatusChip
        tone={isConfirming ? "loading" : visibleStatus.tone}
        text={isConfirming ? "Transaction pending confirmation..." : visibleStatus.text}
      />

      <BottomNav />
    </main>
  );
}
