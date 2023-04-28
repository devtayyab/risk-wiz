import React, { useContext } from 'react';
import Table from './table';
import { Props  , Column} from '../interfaces/interfaces';

const columns : Column[] = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Name', accessor: 'asset_name' },
  { Header: 'Risk Rating', accessor: 'current_risk_rating' },
  { Header: 'Risk Factors', accessor: 'risk_factors' }

];


const DataTable = ({allData , selectedLocation} : Props) => {
  return (
    <div style={{ padding: 20 }}>
    <Table columns={columns} data={allData} selectedrow={selectedLocation} />
    </div>
  );
};

export default DataTable;
