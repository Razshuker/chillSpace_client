import React, { useEffect, useRef } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'; // Import the CSS
import 'leaflet-defaulticon-compatibility';

export default function PlaceMap({ place }) {
    const mapRef = useRef(null);

    useEffect(() => {
        addMap();
        makeMarkers();
    }, []);

    const addMap = () => {
        if (!mapRef.current) {
            mapRef.current = L.map('map', {
                center: [parseFloat(place.location.lat), parseFloat(place.location.lon)],
                zoom: 9
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(mapRef.current);
        }
    }

    const makeMarkers = () => {
        if (place.location) {
            let location = [parseFloat(place.location.lat), parseFloat(place.location.lon)];
            let marker = L.marker(location).addTo(mapRef.current);
            marker.bindPopup(`<b>${place.name}</b>`).openPopup();
        }
    };

    return (
        <div className="placeMap d-flex align-places-center my-3">
            <div id="map" style={{ width: '100%', height: '350px', borderRadius: "24px" }} />
        </div>
    )
}
