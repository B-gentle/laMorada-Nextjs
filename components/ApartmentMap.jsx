"use client";
import React, { useState, useEffect } from "react";
import opencage from "opencage-api-client";
import LoadingPage from "@/app/loading";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import pin from "@/assets/images/home-pin-icon.png";
import Image from "next/image";

const ApartmentMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [geocodeError, setGeocodeError] = useState(false)
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCords = async () => {
      try {
        const res = await opencage.geocode({
          q: `${property.location.street} ${property.location.city} ${property.location.state}`,
          key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
        });

        // check for results
        if(res.results === 0){
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry;

        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setGeocodeError(true)
        setLoading(false)
      }
    };

    fetchCords();
  }, []);

  if (loading) return <LoadingPage />;
  if(geocodeError) {
    return <div className="text-xl">No location data found</div>
  }

  return (
    !loading && (
      <MapContainer
        center={[lat, lng]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            {/* A pretty CSS3 popup. <br /> Easily customizable. */}
          </Popup>
        </Marker>
      </MapContainer>
    )
  );
};

export default ApartmentMap;
