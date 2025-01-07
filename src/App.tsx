import "./App.css";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { Explorer } from "./Explorer";

import { DataContextProvider } from "./Context/Data_context";

function App() {
  return (
    <div className="bg-[#FAFCF7] h-screen flex flex-col items-center justify-between">
      <DataContextProvider>
        <Header />
        <Explorer />
        <Footer />
      </DataContextProvider>
    </div>
  );
}

export default App;
