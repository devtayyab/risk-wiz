"use client"
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const data = [
  {
    id: 1,
    lat: 39.9042,
    long: 116.4074,
    asset_name: 'Forbidden City',
    business_category: 'Museum',
    decade: 1950,
    risk_rating: 8
  },
  {
    id: 2,
    lat: 40.7128,
    long: -74.0060,
    asset_name: 'Statue of Liberty',
    business_category: 'Museum',
    decade: 1980,
    risk_rating: 90
  },
  {
    id: 3,
    lat: 51.5074,
    long: -0.1278,
    asset_name: 'Buckingham Palace',
    business_category: 'Palace',
    decade: 1920,
    risk_rating: 50
  },
  {
    id: 4,
    lat: 35.6895,
    long: 139.6917,
    asset_name: 'Tokyo Tower',
    business_category: 'Observatory',
    decade: 1238,
    risk_rating: 6
  },
  {
    id: 5,
    lat: 48.8566,
    long: 2.3522,
    asset_name: 'Eiffel Tower',
    business_category: 'Observatory',
    decade: 1970,
    risk_rating: 40
  },
  {
    id: 6,
    lat: 41.9028,
    long: 12.4964,
    asset_name: 'Colosseum',
    business_category: 'Amphitheater',
    decade: 1970,
    risk_rating: 34
  },
  // add more data as needed
];

export default function Home() {
  const [decade, setDecade] = useState(2020);
  const mapRef = useRef(null);

  const filteredData = data.filter((item) => {
    return item.decade >= decade
  });

  window && useEffect(() => {
    let map: any;
    if (mapRef.current !== null) {

      map = L.map(mapRef.current).setView([filteredData[0].lat, filteredData[0].long], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; OpenStreetMap contributors',
      }).addTo(map);

      filteredData.forEach((item) => {
        const lat = item.lat;
        const lng = item.long;
        const name = item.asset_name;
        const category = item.business_category;
        const riskRating = item.risk_rating;

        const marker = L.circleMarker([lat, lng], {
          color: getColorFromRating(riskRating),
          fillColor: getColorFromRating(riskRating),
          fillOpacity: 1,
        }).addTo(map);

        marker.bindTooltip(`${name} (${category})`).openTooltip();
      });
    }

    return () => {
      if (map) {
        map.remove(); // remove the map instance when the component unmounts
      }
    }
  }, [decade]);


  function getColorFromRating(rating: any) {
    if (rating < 33) {
      return '#0f0';
    } else if (rating >= 33 && rating < 66) {
      return '#ff0';
    } else {
      return '#f00';
    }
  }

  function handleDecadeChange(event: any) {
    const newDecade = parseInt(event.target.value, 10);
    setDecade(newDecade);
  }
  return (
    <div>
      <div ref={mapRef} style={{ height: '500px' }}></div>
      <div>
        <label htmlFor="decade-select">Select Decade:</label>
        <select id="decade-select" value={decade} onChange={handleDecadeChange}>
          {data.map((v, index) => <option key={index} value={v.decade}>{v.decade}</option>)}
        </select>
      </div>
    </div>
  );
}
