import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SendTransactionNative from "./send-native";
import SendToken from "./send-token";
const Home = () => {
  return (
    <div className="flex flex-col h-full text-white">
      <div className="flex flex-col max-w-md lg:max-w-[30%] h-auto my-auto w-full mx-auto backdrop-filter backdrop-blur-lg bg-opacity-0 px-6 py-4 rounded-lg gap-3 relative">
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
    </div>
  );
};

export default Home;
