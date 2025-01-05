import { useContext } from "react";
import { DataContext } from "./Context/Map_context";
import { Map_component } from "./Map_component";

export function Explorer() {
  const { test } = useContext(DataContext);

  return (
    <div className="flex flex-col w-full h-full justify-start py-6">
      <div className="filters_container px-6">Filter</div>
      <div className="main flex gap-4 h-full">
        <div className="left w-72 px-6 flex flex-col">
          <div className="sub_header">Sub Header</div>
        </div>
        <div className="right w-full bg-slate-300 h-full">
          <Map_component />
        </div>
      </div>
    </div>
  );
}
