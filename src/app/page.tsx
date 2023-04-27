"use client"
import React from 'react';
import LineGraph from './components/Linegraph';
import DataTable from './components/dataTable';
const data = [
  { year: 2010, riskRating: 3 },
  { year: 2011, riskRating: 2 },
  { year: 2012, riskRating: 4 },
  { year: 2013, riskRating: 3 },
  { year: 2014, riskRating: 5 },
  { year: 2015, riskRating: 4 },
  { year: 2016, riskRating: 3 },
  { year: 2017, riskRating: 2 },
  { year: 2018, riskRating: 4 },
  { year: 2019, riskRating: 5 },
  { year: 2020, riskRating: 4 },
  { year: 2021, riskRating: 3 }
];

export default function Home() {
 
  return (
    <div>
     <DataTable></DataTable>
     <LineGraph data={data}></LineGraph>
    </div>
  );
}
