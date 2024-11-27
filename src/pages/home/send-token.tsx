import { useGetBalance, useSendToken } from "@/components/hook/useToken";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChainlinkCircleColorful,
  DAICircleColorful,
  UsdcCircleColorful,
} from "@ant-design/web3-icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { erc20Abi, formatUnits, isAddress } from "viem";
import { useAccount } from "wagmi";
import { getBalance } from "@wagmi/core";
import { config } from "@/wagmi-config";
import toast from 'react-hot-toast';

type Token = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  icon: React.FC;
};

const TOKENS: Token[] = [
  {
    symbol: "LINK",
    name: "Chainlink Token",
    address: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    decimals: 18,
    icon: ChainlinkCircleColorful,
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    address: "0x68194a729C2450ad26072b3D33ADaCbcef39D574",
    decimals: 18,
    icon: DAICircleColorful,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0x0171DE785445F5460AA864bEDfFf3082149DD4DE",
    decimals: 1,
    icon: UsdcCircleColorful,
  },
];

const SendToken = () => {
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");
  const [activeToken, setActiveToken] = useState<Token | null>(null);

  const { address, isConnected, chainId } = useAccount();
  const [sendToken, { isPending, error, isSuccess, isError }] = useSendToken();
  const { balance,symbol,refetch } = useGetBalance(chainId, address, activeToken?.address);

  const onSelectToken = (string: string) => {
    const item = TOKENS.find((token) => token.symbol === string);
    if (!item) return;
    setActiveToken(item);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      // toast.success("Transaction sent successfully");
    }
  })

  const handleSendTransaction = async () => {
    if (!isAddress(to)) {
      toast.error("Invalid address");
      return;
    }

    if (!activeToken) {
      toast.error("Please select a token");
      return;
    }

    const tx = await sendToken(
      activeToken.address as `0x${string}`,
      value,
      to as `0x${string}`,
      activeToken.decimals,
      chainId as number,
      erc20Abi
    );
  };

  return (
    <>
      <div className="flex flex-col w-full max-w-full">
        <h2 className="text-effect">Tranfer Token</h2>
        <Select onValueChange={(value) => onSelectToken(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Token" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Token</SelectLabel>
              {TOKENS.map((token) => (
                <SelectItem value={token.symbol} key={token.symbol}>
                  <div className="flex items-center gap-2">
                    <token.icon />
                    <span>{token.symbol}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col w-full max-w-full mt-5">
        <label className="font-bold" htmlFor="quantity">
          Amount
        </label>
        <Input
          type="number"
          id="Amount"
          onChange={(e) => setValue(e.target.value)}
          defaultValue="0"
          min="0"
        />
        <span className="text-xs text-gray-500">
          Balance:{" "}
          {balance ? `${balance} ${symbol}`  : "0"}
        </span>
      </div>
      <div className="flex flex-col w-full max-w-full mt-5">
        <label className="font-bold" htmlFor="address">
          To Address
        </label>
        <Input id="address" onChange={(e) => setTo(e.target.value)} />
      </div>

      {isConnected ? (
        <Button
          disabled={isPending}
          onClick={handleSendTransaction}
          className="w-full mt-5"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              Please wait
            </>
          ) : (
            "Send"
          )}
        </Button>
      ) : (
        <div className="w-full mt-5">
          <ConnectButton label="Connect Wallet" />
        </div>
      )}
    </>
  );
};

export default SendToken;
