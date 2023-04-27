import React from 'react';
import Table from './table';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Name', accessor: 'asset_name' },
  { Header: 'Risk Rating', accessor: 'risk_rating' }
];
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

const DataTable = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Data Table</h1>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default DataTable;
