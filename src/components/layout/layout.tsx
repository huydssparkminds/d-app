import Particles from "../ui/particles";
import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="wrapper">
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={'#ffffff'}
          refresh
        />
        {children}
      </div>
    </>
  );
};

export default Layout;
