import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SendTransactionNative from "./send-native";
import SendToken from "./send-token";
import { BorderBeam } from "@/components/ui/border-beam";
const Home = () => {
  return (
    <div className="max-w-md lg:max-w-[30%] h-auto my-auto w-full mx-auto bg-[#121212] px-6 py-4 rounded-lg gap-3 relative text-white">
      <BorderBeam size={250} duration={12} delay={9} />
      <Tabs defaultValue="Native coin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Native coin">Native coin</TabsTrigger>
          <TabsTrigger value="Token">Token</TabsTrigger>
        </TabsList>
        <hr className="h-px my-3 border-0 dark:bg-gray-700" />
        <TabsContent value="Native coin">
          <SendTransactionNative />
        </TabsContent>
        <TabsContent value="Token">
          <SendToken />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
