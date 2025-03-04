import { IHouse } from '../types/IHouse';

export interface HousesContextProps {
  houses: IHouse[];
  loadingState: string;
  addHouse: (newHouse: IHouse) => Promise<void>;
}

export interface HousesProviderProps {
  children: React.ReactNode;
}
