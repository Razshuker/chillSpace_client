import React, { useContext, useEffect, useRef, useState } from 'react';
import '../../../css/favorites.css'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

export default function Map({ getFavorites, favorites }) {
    const [mapMarkers, setMapMarkers] = useState([]);

    const mapRef = useRef(null);

    useEffect(() => {
        getFavorites();
        addMap();
        makeMarkers();
    }, [favorites.length]);

    const addMap = () => {
        if (!mapRef.current) {
            mapRef.current = L.map('map', {
                center: [31.0461, 34.8516], // Israel's latitude and longitude
                zoom: 8
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(mapRef.current);
        }
    }

    const makeMarkers = () => {
        mapMarkers.forEach(marker => marker.remove());
        setMapMarkers([]);
        if (favorites.length >= 1) {
            const newMarkers = favorites.map(item => {
                let location = [parseFloat(item.location.lat), parseFloat(item.location.lon)];
                let marker = L.marker(location).addTo(mapRef.current);
                marker.bindPopup(`<b>${item.name}</b>`).openPopup();
                return marker;
            });
            setMapMarkers(newMarkers);
        }
    };

    return (
        <div className="map d-flex align-items-center my-3">
            <div id="map" style={{ width: '100%', height: '750px', borderRadius: "24px" }} />
        </div>
    )
}
