import { useSendNative } from "@/components/hook/useToken";
import BlurIn from "@/components/ui/blur-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { isAddress } from "viem";
import { useAccount, useBalance } from "wagmi";

const SendTransactionNative = () => {
  const { address, isConnected, chain } = useAccount();
  const result = useBalance({
    address: address,
  });
  const [sendNativeCoin, { isPending, error, isError, isSuccess }] =
    useSendNative();
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isSuccess) {
      toast.success("Tranfer successful");
    }
  }, [isSuccess]);

  const handleSendTransaction = async () => {
    if (!isAddress(to)) {
      toast.error("Invalid address");
      return;
    }
    sendNativeCoin(address as `0x${string}`, value, to as `0x${string}`);
  };
  return (
    <>
      <div className="flex flex-col w-full max-w-full">
        <BlurIn
          word="Tranfer Coin"
          className="lg:text-2xl font-bold text-white"
        />
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
        <span className="text-xs text-gray-400">
          Balance: {result.data?.formatted} {result.data?.symbol}
        </span>
      </div>
      <div className="flex flex-col w-full max-w-full mt-5">
        <label className="font-bold" htmlFor="address">
          To Address
        </label>
        <Input id="address" onChange={(e) => setTo(e.target.value)} />
      </div>

      <Button
        disabled={isPending || !isConnected}
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
    </>
  );
};

export default SendTransactionNative;
