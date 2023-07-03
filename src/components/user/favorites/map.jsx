import React, { useContext, useEffect, useRef } from 'react';
import '../../../css/favorites.css'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MyContext } from '../../../context/myContext';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'; // Import the CSS
import 'leaflet-defaulticon-compatibility';

export default function Map() {
    const { getFavorites, favorites } = useContext(MyContext);

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
        if (favorites.length >= 1) {
            favorites.map(item => {
                let location = [parseFloat(item.location.lat), parseFloat(item.location.lon)];
                let marker = L.marker(location).addTo(mapRef.current);
                marker.bindPopup(`<b>${item.name}</b>`).openPopup();
            });
        }
    };

    return (
        <div className="map d-flex align-items-center my-3">
            <div id="map" style={{ width: '100%', height: '750px', borderRadius: "24px" }} />
        </div>
    )
}
