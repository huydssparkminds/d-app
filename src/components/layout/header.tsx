import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <header className="fixed top-5 left-0 right-0 flex items-center justify-between px-4 py-2 bg-[#FFFFFF33] z-50 rounded-full backdrop-blur-[3px] shadow-lg w-3/5 mx-auto">
      <div className="flex items-center space-x-8">
        <div className="flex items-center">
          <span className="text-white text-2xl font-bold">DApp</span>
        </div>
      </div>
      <ConnectButton label="Connect Wallet" />
    </header>
  );
};

export default Header;
