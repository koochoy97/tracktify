import { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context/Data_context";
import { Map_component } from "./Map_component";
import { TrailLocation_item } from "./TrailLocation_item";
import { Explorer_filter } from "./Explorer_filter";
import { Mountain_loader } from "./Mountain_loader";

export function Explorer() {
  const { get_records, trails, locations } = useContext(DataContext);
  const [trails_or_locations, setTrails_or_locations] = useState("trails");
  const [loading_trails, setLoading_trails] = useState(true);

  const handle_trail_or_location_selection = (selection: string) => {
    if (selection === "trails") {
      setTrails_or_locations(selection);
    } else if (selection === "locations") {
      setTrails_or_locations(selection);
    }
  };

  useEffect(() => {
    get_records("view_trails_with_dificultad_lugares", "nombre", "-");
    get_records("lugares", "nombre", "-");
  }, []);

  useEffect(() => {
    console.log(loading_trails);
    if (trails.length === 0) {
      setLoading_trails(true);
    } else {
      setLoading_trails(false);
    }
  }, [trails]);

  return (
    <div className="flex flex-col w-full h-full justify-start pt-6 overflow-hidden">
      <div className="filters_container px-6 mb-4">
        <Explorer_filter />
      </div>
      <div className="main flex gap-4 h-full overflow-hidden">
        {/* LEFT COLUMN */}
        <div className="left w-[550px] h-full px-6 flex flex-col overflow-hidden">
          <div className="sub_header flex w-full justify-between mb-4 px-2 text-center text-md shadow_bottom">
            <p
              className={`font-bold w-1/2 py-2  ${
                trails_or_locations === "trails"
                  ? "border-[#66964F] border-b-2"
                  : ""
              } border-[#66964F] cursor-pointer`}
              onClick={() => {
                handle_trail_or_location_selection("trails");
              }}
            >
              Trails
            </p>
            <p
              className={`font-bold w-1/2 py-2 cursor-pointer ${
                trails_or_locations === "locations"
                  ? "border-[#66964F] border-b-2"
                  : ""
              }`}
              onClick={() => {
                handle_trail_or_location_selection("locations");
              }}
            >
              Lugares
            </p>
          </div>
          {/* TRAILS ITEMS */}
          <Mountain_loader show={loading_trails} width="w-[100px]" />

          {trails_or_locations === "trails" ? (
            <div className="items_container flex flex-col gap-10 overflow-y-scroll px-2">
              {trails.map((item) => {
                return (
                  <TrailLocation_item
                    key={item.id}
                    type={"trail"}
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
          ) : (
            <div className="items_container flex flex-col gap-10 overflow-y-scroll px-2">
              {locations.map((item) => {
                return (
                  <TrailLocation_item
                    key={item.id}
                    type={"location"}
                    name={item.nombre}
                    img_src={
                      "https://mtb.pockethost.io/api/files/lugares/" +
                      item.id +
                      "/" +
                      item.foto_destacada
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
        {/* RIGHT COLUMN */}
        <div className="right w-full  h-full">
          <Map_component />
        </div>
      </div>
    </div>
  );
}
