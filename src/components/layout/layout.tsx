import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="wrapper">
        {children}
      </div>
    </>
  );
};

export default Layout;
