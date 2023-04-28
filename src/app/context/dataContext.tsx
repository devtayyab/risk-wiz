import React from "react";
import data from './data.json'
import {DataContextValue  , LocationData} from '../interfaces/interfaces'
interface DataProviderProps {
  children: React.ReactNode;
}


export const DataContext = React.createContext<DataContextValue | null>(null);
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Define shared state here
  const [selectedDecade, setSelectedDecade] = React.useState(1950);
  const [riskData, setRiskData] = React.useState<(string | number)[]>([]);
  const [allData, setallData] = React.useState<(LocationData)[]>(data.locations);
  const [selectedLocation, setSelectLocation] = React.useState<LocationData | null | undefined>(null);

  // Define methods to update shared state
  const updateSelectedDecade = (decade: number) => {
    setSelectedDecade(decade);
  };
  const updateRiskData = (data: any[]) => {
    setRiskData(data);
  };

  // Set up value object with shared state and update methods
  const value: DataContextValue = {
    selectedDecade: selectedDecade,
    updateSelectedDecade: () => { },
    riskData: riskData,
    updateRiskData: () => { },
    allData:allData,
    setSelectLocation:(data : LocationData) => setSelectLocation(data),
    selectedLocation: selectedLocation
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
