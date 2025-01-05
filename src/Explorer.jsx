import { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context/Data_context";
import { Map_component } from "./Map_component";
import { TrailLocation_item } from "./TrailLocation_item";

export function Explorer() {
  const { get_records, trails } = useContext(DataContext);

  useEffect(() => {
    get_records("view_trails_with_dificultad_lugares", "nombre", "-");
  }, []);

  return (
    <div className="flex flex-col w-full h-full justify-start pt-6 overflow-hidden">
      <div className="filters_container px-6">Filter</div>
      <div className="main flex gap-4 h-full overflow-hidden">
        <div className="left w-82 px-6 flex flex-col overflow-hidden">
          <div className="sub_header">Sub Header</div>
          <div className="items_container flex flex-col gap-10 overflow-y-scroll">
            {trails.map((item) => {
              return (
                <TrailLocation_item
                  key={item.id}
                  name={item.nombre}
                  img_src={
                    "https://mtb.pockethost.io/api/files/view_trails_with_dificultad_lugares/" +
                    item.id +
                    "/" +
                    item.foto_destacada
                  }
                  location={item.lugar_nombre}
                  description={item.descripcion}
                  dificultad={item.dificultad_nombre}
                />
              );
            })}
          </div>
        </div>
        <div className="right w-full  h-full">
          <Map_component />
        </div>
      </div>
    </div>
  );
}
