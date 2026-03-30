"use client";

import { useMemo } from "react";
import { useReadContracts } from "wagmi";
import { zeroAddress } from "viem";
import { baseCounterAbi } from "@/lib/abi/baseCounterAbi";
import { BASE_COUNTER_CONTRACT_ADDRESS } from "@/lib/contracts";

export function useBaseCounter(address?: `0x${string}`) {
  const enabled = Boolean(address);

  const query = useReadContracts({
    allowFailure: true,
    contracts: [
      {
        abi: baseCounterAbi,
        address: BASE_COUNTER_CONTRACT_ADDRESS,
        functionName: "getCount",
        args: [address ?? zeroAddress],
      },
      {
        abi: baseCounterAbi,
        address: BASE_COUNTER_CONTRACT_ADDRESS,
        functionName: "counts",
        args: [address ?? zeroAddress],
      },
    ],
    query: {
      enabled,
      refetchOnWindowFocus: true,
    },
  });

  const count = useMemo(() => {
    const getCountResult = query.data?.[0]?.result;
    if (typeof getCountResult === "bigint") return getCountResult;

    const countsResult = query.data?.[1]?.result;
    if (typeof countsResult === "bigint") return countsResult;

    return BigInt(0);
  }, [query.data]);

  return {
    count,
    countLabel: count.toString(),
    isLoading: enabled && (query.isLoading || query.isFetching),
    error: query.error,
    refetch: query.refetch,
  };
}
