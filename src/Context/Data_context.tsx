import { createContext, useState } from "react";
import PocketBase from "pocketbase";

export const DataContext = createContext({} as DataContextValue);

//////TYPES/////
type Trail = {
  id: string;
  nombre: string;
  descripcion: string;
  foto_destacada: string;
  dificultad_nombre: string;
  lugar_nombre: string;
  [key: string]: any;
};

type Location = {
  id: string;
  nombre: string;
  descipcion: string;
  foto_destacada: string;
};

type Dificultad_options = {
  id: string;
  nombre: string;
};

type Features_options = {
  id: string;
  nombre: string;
};

interface DataContextValue {
  get_records: (
    table: string,
    sort_field: string,
    sort_operator: "+" | "-"
  ) => Promise<void>;
  trails: Trail[];
  locations: Location[];
  dificultad_options: Dificultad_options[];
  features_options: Features_options[];
}

///////////////////////////////////
export function DataContextProvider(props: React.PropsWithChildren<{}>) {
  const pb = new PocketBase("https://mtb.pockethost.io");
  pb.autoCancellation(false);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [dificultad_options, setDificultad_options] = useState<
    Dificultad_options[]
  >([]);
  const [features_options, setFeatures_options] = useState<Features_options[]>(
    []
  );

  const get_records = async (
    table: string,
    sort_field: string,
    sort_operator: "+" | "-"
  ) => {
    try {
      // Hacer la consulta a PocketBase
      const records = await pb.collection(table).getFullList({
        sort: sort_operator + sort_field, // Concatenar el operador y el campo
      });
      console.log(records);
      switch (table) {
        //El objeto que viene de pocketbase es de otro tipo al declarado, por lo tanto se tiene que mapearlo y marcarle el tipado como unknown y luego Trail.
        case "view_trails_with_dificultad_lugares":
          console.log(records);
          setTrails(
            records.map((record) => ({ ...record } as unknown as Trail))
          );
          break;

        case "lugares":
          setLocations(
            records.map((record) => ({ ...record } as unknown as Location))
          );
          break;

        case "dificultad_trails":
          setDificultad_options(
            records.map(
              (record) => ({ ...record } as unknown as Dificultad_options)
            )
          );
          break;

        case "features":
          setFeatures_options(
            records.map(
              (record) => ({ ...record } as unknown as Features_options)
            )
          );
          break;
      }
    } catch (error) {
      console.error("Error al obtener los registros:", error);
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
