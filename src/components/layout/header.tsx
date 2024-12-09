import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <header className="fixed top-5 left-0 right-0 flex justify-end px-10 py-2 z-50 rounded-full shadow-lg mx-auto">
      <ConnectButton label="Connect Wallet" />
    </header>
  );
};

export default Header;
