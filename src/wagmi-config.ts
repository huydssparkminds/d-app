import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  binanceWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
const projectId = "413b78027137605a388461d888501f98";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [walletConnectWallet, binanceWallet],
    },
  ],
  {
    appName: "My Dapp",
    projectId: projectId,
  }
);

export const config = createConfig({
  chains: [sepolia],
  connectors,
  transports: {
    [sepolia.id]: http(),
  },
});
