import ScreenProvider from "@/components/Screen/provider/ScreenProvider";
import Page1 from "./pages/Page1";
import Screen from "@/components/Screen/ui/Screen";
import Page2 from "./pages/Page2";
import TabGroup from "@/components/Screen/ui/TabGroup";
import Tab from "@/components/Screen/ui/Tab";
import EmptyPage from "./pages/EmptyPage";

function App() {
    return (
        <div className="w-screen h-screen flex flex-col">
            <ScreenProvider>
                <Screen pageName="">
                    <EmptyPage />
                </Screen>
                <Screen pageName="page-1">
                    <Page1 />
                </Screen>
                <Screen pageName="page-2">
                    <Page2 />
                </Screen>
                <TabGroup>
                    <Tab pageName="page-1">Home</Tab>
                    <Tab pageName="page-2">Scan</Tab>
                </TabGroup>
            </ScreenProvider>
        </div>
    );
}

export default App;
