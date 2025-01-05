import { createContext, useState } from "react";

export const DataContext = createContext();

export function DataContextProvider(props) {
  const [test, setTest] = useState("A");

  return (
    <DataContext.Provider value={{ test }}>
      {props.children} {/* Aquí se renderizan los componentes hijos */}
    </DataContext.Provider>
  );
}
