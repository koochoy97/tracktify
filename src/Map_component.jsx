import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useRef, useEffect } from "react";

export function Map_component() {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia29vY2hveTk3IiwiYSI6ImNscnJibnpmZDAyNXUya3M4MG50dW14bWEifQ.4gNp9lwIK4C-HupwI0fX-A";

    //Inicializar el mapa
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-77.02584394780047, -12.119054386657599],
      zoom: 11,
    });

    //Agregar el control de zoom
    // Agregar controles de navegación
    const navControl = new mapboxgl.NavigationControl();
    mapRef.current.addControl(navControl, "top-right"); //

    return () => {
      mapRef.current.remove();
    };
  }, []);

  const mapRef = useRef();
  const mapContainerRef = useRef();

  return <div className="w-full h-full" id="map" ref={mapContainerRef}></div>;
}
