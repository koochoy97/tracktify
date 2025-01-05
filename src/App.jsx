import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Header } from "./Header";
import { Home } from "./Home";
import { Footer } from "./Footer";
import { Explorer } from "./Explorer";

function App() {
  return (
    <div className="bg-[#FAFCF7] h-screen flex flex-col items-center justify-between">
      <Header />
      <Explorer />
      <Footer />
    </div>
  );
}

export default App;
