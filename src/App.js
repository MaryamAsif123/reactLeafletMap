import React from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { statesData } from "./data";

const center = [29.496094591500064, 70.53509030746767];

export default function App() {
  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ width: "100vw", height: "100vh" }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=0qFR085i0jbmMXCnPIKH"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />

      {statesData.features.map((state, index) => {
        const coordinates = state.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ]);

        return (
          <Polygon
            key={index}
            pathOptions={{
              fillColor: "green",
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: "#36454F",
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: "",
                  fillColor: "#8A9A5B",
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: "#DAF7A6",
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: "3",
                  color: "#36454F",
                  fillColor: "green",
                });
              },
              click: (e) => {},
            }}
          >
            <Popup position={center}>
              <div>
                <h4>{state.properties.shapeName}</h4>
              </div>
            </Popup>
          </Polygon>
        );
      })}
    </MapContainer>
  );
}
