"use client"
import React, { useContext } from 'react';
import Main from './components/Home';
import { DataProvider } from './context/dataContext'


export default function Home() {

  return (
    <div>
      <DataProvider>
        <Main/>
      </DataProvider>
    </div>
  );
}
