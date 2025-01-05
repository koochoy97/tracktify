import { createContext, useState } from "react";
import PocketBase from "pocketbase";

export const DataContext = createContext();

///////////////////////////////////
export function DataContextProvider(props) {
  const pb = new PocketBase("https://mtb.pockethost.io");
  pb.autoCancellation(false);
  const [trails, setTrails] = useState([]);

  const get_records = async (table, sort_field, sort_operator) => {
    try {
      // Hacer la consulta a PocketBase
      const records = await pb.collection(table).getFullList({
        sort: sort_operator + sort_field, // Concatenar el operador y el campo
      });
      console.log(records);
      switch (table) {
        case "view_trails_with_dificultad_lugares":
          setTrails(records);
          break;
      }
      return records; // Devolver los registros
    } catch (error) {
      console.error("Error al obtener los registros:", error);
      return []; // Devolver un array vacío en caso de error
    }
  };

  return (
    <DataContext.Provider value={{ get_records, trails }}>
      {props.children} {/* Aquí se renderizan los componentes hijos */}
    </DataContext.Provider>
  );
}
