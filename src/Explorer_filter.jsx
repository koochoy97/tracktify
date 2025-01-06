import { Dropdown } from "./Dropdown";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context/Data_context";
import { MultiSelect } from "./Multiselect";

export function Explorer_filter() {
  const { get_records, dificultad_options } = useContext(DataContext);

  useEffect(() => {
    get_records("dificultad_trails", "orden", "+");
  }, []);
  return (
    <div className="flex items-center gap-2">
      <Dropdown placeholder="Dificultad" options={dificultad_options} />
      <MultiSelect placeholder="Dificultad" options={dificultad_options} />
    </div>
  );
}
