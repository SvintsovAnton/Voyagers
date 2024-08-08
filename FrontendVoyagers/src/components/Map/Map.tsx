import React from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { MapWrapper, StyledMapContainer } from "./styles"

// Координаты для отображения местности в Швейцарии (пример: Маттерхорн)
const initialPosition = { lat: 47.5, lng: 9.0 } // Координаты Маттерхорн, Швейцария

const Map: React.FC = () => {
  return (
    <MapWrapper>
      <StyledMapContainer>
        <MapContainer
          center={[initialPosition.lat, initialPosition.lng]}
          zoom={6}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          minZoom={4}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </StyledMapContainer>
    </MapWrapper>
  )
}

export default Map
