import React, { useContext, lazy, Suspense  } from 'react';
import dynamic from 'next/dynamic'
import { DataContext } from '../context/dataContext';
import { DataContextValue } from '../interfaces/interfaces'
// const RiskMap = lazy(() => import('./Map'));
const LineGraph = lazy(() => import('./Linegraph'));
const DataTable = lazy(() => import('./dataTable'));
const RiskMap = dynamic(
    () => import('./Map'),
    { ssr: false }
  )

export default function Main() {
    const { allData, riskData, selectedLocation } = useContext(DataContext) as DataContextValue;
    return (
        <div className='container mx-auto px-4 mt-5'>
            
            <RiskMap data={allData} />

            <Suspense fallback={<div><div className="w-8 h-8 border-4 border-green-300 rounded-full animate-spin"></div>
            </div>}>
                <div className='flex flex-col md:flex-row items-center justify-center my-8'>
                    <DataTable allData={allData} selectedLocation={selectedLocation} />
                    {selectedLocation && (
                        <Suspense fallback={<div><div className="w-8 h-8 border-4 border-green-300 rounded-full animate-spin"></div>
                        </div>}>
                            <LineGraph data={selectedLocation} />
                        </Suspense>
                    )}
                </div>
            </Suspense>

        </div>
    )
}
