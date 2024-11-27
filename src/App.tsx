import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/layout";
import Home from "./pages/home";

function App() {
  return (
    <Layout>
      <Toaster />
      <Home />
    </Layout>
  );
}

export default App;
