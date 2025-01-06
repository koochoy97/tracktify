import { createContext, useState } from "react";
import PocketBase from "pocketbase";

export const DataContext = createContext();

///////////////////////////////////
export function DataContextProvider(props) {
  const pb = new PocketBase("https://mtb.pockethost.io");
  pb.autoCancellation(false);
  const [trails, setTrails] = useState([]);
  const [locations, setLocations] = useState([]);
  const [dificultad_options, setDificultad_options] = useState([]);
  const [features_options, setFeatures_options] = useState([]);

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

        case "lugares":
          setLocations(records);
          break;

        case "dificultad_trails":
          setDificultad_options(records);
          break;

        case "features":
          setFeatures_options(records);
          break;
      }

      return records; // Devolver los registros
    } catch (error) {
      console.error("Error al obtener los registros:", error);
      return []; // Devolver un array vacío en caso de error
    }
  };

  return (
    <DataContext.Provider
      value={{
        get_records,
        trails,
        locations,
        dificultad_options,
        features_options,
      }}
    >
      {props.children} {/* Aquí se renderizan los componentes hijos */}
    </DataContext.Provider>
  );
}
