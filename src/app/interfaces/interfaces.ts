export interface LocationData {
    asset_name: string;
    business_category: string;
    lat: number;
    long: number;
    current_risk_rating: number;
    decade: number;
    yearly_data: YearlyData[];
  }
  
  interface YearlyData {
    year: number;
    risk_rating: number;
    risk_factors: string[];
  }
  
  interface LocationObject {
    locations: LocationData[];
  }
  
  export interface DataContextValue {
    selectedDecade: number;
    updateSelectedDecade: (decade: number) => void;
    riskData: (string | number)[];
    updateRiskData: (data: any[]) => void;
    allData:LocationData[]
    setSelectLocation :  (data: LocationData) => void;
    selectedLocation : LocationData | null | undefined
  }
  
 export interface Props {
    allData: LocationData[];
    selectedLocation: LocationData | null | undefined;
  }

  export interface Column {
    Header: string;
    accessor: string;
  }