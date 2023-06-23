import React, { useEffect, useRef, useState } from 'react';
import { API_URL, doApiGet } from '../../../services/apiService';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
    const [favorites, setFavorites] = useState([]);

    const mapRef = useRef(null);

    useEffect(() => {
        getFavorites();
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
        makeMarkers();

    }, []);

    const makeMarkers = () => {
        favorites.map(item => {
            let location = item.location.lat + "," + item.location.lon;
            console.log(location);
            let marker = L.marker([`${location}`]).addTo(mapRef.current); // Latitude and longitude of the marker
            marker.bindPopup('<b>Tel Aviv</b>').openPopup(); // Popup content
        })
    }

    const getFavorites = async () => {
        try {
            const url = API_URL + "/users/favorites";
            const data = await doApiGet(url);
            getPlaces(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getPlaces = async (_favorites) => {
        try {
            const url = API_URL + "/places?perPage=0";
            const data = await doApiGet(url);
            const filterData = data.filter(item => {
                return _favorites.includes(item._id);
            })
            setFavorites(filterData);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="map d-flex align-items-center">
            <div id="map" style={{ width: '100%', height: '750px' }} />
        </div>
    )
}
