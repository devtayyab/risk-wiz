import { useContext, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {DataContextValue, LocationData} from '../interfaces/interfaces'
import {DataContext} from '../context/dataContext'
interface RiskMapProps {
  data: LocationData[];
}

const RiskMap = ({data}: RiskMapProps) =>{
  const {setSelectLocation} = useContext(DataContext) as DataContextValue
  const [decade, setDecade] = useState(2020);
  const mapRef = useRef(null);

  const [selectedLocation, setSelectedLocation] = useState<LocationData | null | undefined>(null); // add state for storing selected location

  const filteredData = data.filter((item) => {
    return item.decade >= decade
  }).map((item, index) => ({ ...item, id: index })); // add id field to each location object

 useEffect(() => {
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
        const riskRating = item.current_risk_rating;

        const marker = L.circleMarker([lat, lng], {
          color: getColorFromRating(riskRating),
          fillColor: getColorFromRating(riskRating),
          fillOpacity: 1,
          
        }).addTo(map);

        marker.bindPopup(`${name} (${category}) <br> Current risk rating: ${riskRating}`);

        marker.on('click', () => {
          const selectedId = item.id;
          const selectedLocation = filteredData.find((location) => location.id === selectedId);
          setSelectedLocation(selectedLocation);
          selectedLocation &&  setSelectLocation(selectedLocation)
        });
      });
    }

    return () => {
      if (map) {
        map.remove(); // remove the map instance when the component unmounts
      }
    }
  }, [decade] );


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
    <div className="flex flex-col md:flex-row  justify-center">
    <div ref={mapRef} style={{ height: '500px' }} className="w-full h-96 md:w-3/4 md:h-full"></div>
    <div className="md:w-1/4 py-4 px-2 text-center md:text-left">
      <label htmlFor="decade-select" className="font-medium">Select Decade:</label>
      <select id="decade-select" value={decade} onChange={handleDecadeChange} className="block w-full mt-2 mb-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
        {data.map((v, index) => <option key={index} value={v.decade}>{v.decade}</option>)}
      </select>
      {selectedLocation && (
        <div>
          <h2 className="font-medium">{selectedLocation.asset_name}</h2>
          <h2 className="text-gray-600">{selectedLocation.business_category}</h2>
          <h2 className={`font-medium ${selectedLocation.current_risk_rating < 33 ? 'text-green-500' : (selectedLocation.current_risk_rating >= 33 && selectedLocation.current_risk_rating < 66) ? 'text-yellow-500' : 'text-red-500'}`}>{`Current risk rating: ${selectedLocation.current_risk_rating}`}</h2>
        </div>
      )}
    </div>
  </div>
  );
}

export default RiskMap;

{/* <div ref={mapRef} style={{ height: '500px' }}></div> */}