import { formatUnits, parseEther, parseUnits } from "viem";
import {
  useSendTransaction,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { getBalance } from "@wagmi/core";
import { config } from "@/wagmi-config";
import { useEffect, useState } from "react";

const useSendNative = () => {
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
    isError,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const sendNativeCoin = async (
    fromAddress: `0x${string}`,
    amount: string,
    toAddress: `0x${string}`
  ) => {
    const res = await sendTransaction({
      account: fromAddress,
      to: toAddress,
      value: parseEther(amount),
    });
    return res;
  };

  return [sendNativeCoin, { isPending, error, isSuccess, isError }] as const;
};

const useSendToken = () => {
  const { writeContractAsync, isError, isSuccess, isPending, error, data } = useWriteContract();
  const sendToken = async (
    tokenAddress: `0x${string}`,
    amount: string,
    toAddress: `0x${string}`,
    tokenDecimal: number,
    chainId: number,
    erc20Abi: any
  ) => {
    const res = await writeContractAsync({
      chainId: chainId,
      abi: erc20Abi,
      address: tokenAddress,
      functionName: "tranfer",
      args: [toAddress, parseUnits(amount, tokenDecimal)],
    });
    return res;
  };

  return [sendToken, { isPending, error, isSuccess, isError, data }] as const;
};

interface BalanceState {
  balance: string;
  symbol: string;
  isLoading: boolean;
  error: Error | null;
}

const useGetBalance = (
  chainId: number | undefined,
  address?: `0x${string}`,
  tokenAddress?: string
) => {
  const [balanceState, setBalanceState] = useState<BalanceState>({
    balance: "0",
    symbol: "",
    isLoading: false,
    error: null,
  });

  const fetchBalance = async () => {
    if (!address || !tokenAddress) {
      setBalanceState((prev) => ({ ...prev, balance: "0" }));
      return;
    }

    try {
      setBalanceState((prev) => ({ ...prev, isLoading: true, error: null }));

      const res = await getBalance(config, {
        chainId: chainId as any,
        address: address,
        token: tokenAddress as `0x${string}`,
      });

      const formattedBalance = formatUnits(res.value, res.decimals);

      setBalanceState({
        balance: formattedBalance,
        symbol: res.symbol,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setBalanceState({
        balance: "0",
        symbol: "",
        isLoading: false,
        error: error as Error,
      });
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [chainId, address, tokenAddress]);

  return {
    ...balanceState,
    refetch: fetchBalance,
  };
};

export { useSendNative, useSendToken, useGetBalance };
