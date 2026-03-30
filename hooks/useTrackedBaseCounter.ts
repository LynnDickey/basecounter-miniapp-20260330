"use client";

import { useCallback } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { base } from "wagmi/chains";
import { baseCounterAbi } from "@/lib/abi/baseCounterAbi";
import { BASE_COUNTER_CONTRACT_ADDRESS } from "@/lib/contracts";
import { DATA_SUFFIX } from "@/lib/wagmi";
import { trackTransaction } from "@/utils/track";

export function useTrackedBaseCounter() {
  const { address } = useAccount();
  const { writeContractAsync, isPending, error, reset } = useWriteContract();

  const increaseTracked = useCallback(async () => {
    if (!address) {
      throw new Error("Please connect wallet first.");
    }

    const txHash = await writeContractAsync({
      abi: baseCounterAbi,
      address: BASE_COUNTER_CONTRACT_ADDRESS,
      functionName: "increase",
      args: [],
      chainId: base.id,
      dataSuffix: DATA_SUFFIX,
    });

    void trackTransaction("app-006", "BaseCounter", address, txHash);
    return txHash;
  }, [address, writeContractAsync]);

  return {
    increaseTracked,
    isPending,
    error,
    reset,
  };
}
