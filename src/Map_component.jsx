import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect } from "react";

export function Map_component() {
  const test_locations = [
    {
      id: 1,
      coordinates: [-77.03349521099975, -12.115101682715606],
      nombre: "Casa 1",
    },
    {
      id: 2,
      coordinates: [-77.13534778004776, -12.115101682715606],
      nombre: "Casa 2",
    },
  ];

  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia29vY2hveTk3IiwiYSI6ImNscnJibnpmZDAyNXUya3M4MG50dW14bWEifQ.4gNp9lwIK4C-HupwI0fX-A";

    // Inicializar el mapa
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-77.02584394780047, -12.119054386657599],
      zoom: 11,
    });

    // Agregar el control de zoom
    const navControl = new mapboxgl.NavigationControl();
    mapRef.current.addControl(navControl, "top-right");

    // Agregar marcadores
    test_locations.forEach((location) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundColor = "#4264fb";
      el.style.width = "30px";
      el.style.height = "30px";
      el.style.borderRadius = "50%";
      el.style.cursor = "pointer";

      // Agregar el marcador al mapa
      new mapboxgl.Marker(el)
        .setLngLat(location.coordinates)
        .addTo(mapRef.current)
        .getElement()
        .addEventListener("click", () => {
          console.log(`Clicked marker with ID: ${location.id}`);
          // Aquí puedes realizar cualquier acción, como mostrar un popup
        });

      // Crear el popup que se mostrará al hacer hover
      const popup = new mapboxgl.Popup({
        closeButton: false, // Evitar el botón de cierre
        closeOnClick: false, // No cerrarlo al hacer clic en el mapa
      }).setHTML(`<h3>${location.nombre}</h3>`); // Personalizar el contenido del popup

      // Mostrar el popup al hacer hover sobre el marcador
      el.addEventListener("mouseenter", () => {
        popup.setLngLat(location.coordinates).addTo(mapRef.current);
      });

      // Ocultar el popup al salir del marcador
      el.addEventListener("mouseleave", () => {
        popup.remove();
      });
    });

    // Cleanup al desmontar el componente
    return () => {
      mapRef.current.remove();
    };
  }, []);

  return <div className="w-full h-full" id="map" ref={mapContainerRef}></div>;
}
