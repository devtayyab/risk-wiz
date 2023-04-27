import React from "react";


interface DataProviderProps {
    children: React.ReactNode;
  }
  interface DataContextValue {
    selectedDecade: string;
    updateSelectedDecade: (decade: string) => void;
    riskData: (string | number)[];
    updateRiskData: (data: any[]) => void;
  }
  
  export const DataContext = React.createContext<DataContextValue | null>(null);
const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    // Define shared state here
    const [selectedDecade, setSelectedDecade] = React.useState("1950s");
    const [riskData, setRiskData] = React.useState<(string | number)[]>([]);
  
    // Define methods to update shared state
    const updateSelectedDecade = (decade: string) => {
      setSelectedDecade(decade);
    };
    const updateRiskData = (data: any[]) => {
      setRiskData(data);
    };
  
    // Set up value object with shared state and update methods
    const value: DataContextValue = {
        selectedDecade: "",
        updateSelectedDecade: () => {},
        riskData: [],
        updateRiskData: () => {}
      };
  
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
  };
  