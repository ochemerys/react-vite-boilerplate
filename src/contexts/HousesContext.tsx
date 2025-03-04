import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { IHouse } from '../types/IHouse';
import { get, post } from '../api/houses';
import houseApiBaseUrl from '../app.config';
import loadingStatus from '../utils/loadingStatus';
import { HousesContextProps, HousesProviderProps } from './interfaces';

const HousesContext = createContext<HousesContextProps>({
  houses: [],
  loadingState: loadingStatus.isLoading,
  addHouse: async () => { }, // Dummy function
});

export const useHousesContext = () => useContext(HousesContext);

function HousesProvider({ children }: HousesProviderProps) {
  const [houses, setHouses] = useState<IHouse[]>([]);
  const [loadingState, setLoadingState] = useState<string>(loadingStatus.isLoading);

  useEffect(() => {
    const fetchHouses = async () => {
      setLoadingState(loadingStatus.isLoading);
      const items = await get(houseApiBaseUrl);
      setHouses(items);
      setLoadingState(loadingStatus.loaded);
    };
    fetchHouses();
  }, []);

  const value = useMemo(() => ({
    houses,
    loadingState,
    addHouse: async (newHouse: IHouse) => {
      setLoadingState(loadingStatus.isLoading);
      await post(houseApiBaseUrl, newHouse);
      const updatedHouses = await get(houseApiBaseUrl);
      setHouses(updatedHouses);
      setLoadingState(loadingStatus.loaded);
    },
  }), [houses, loadingState]);

  return (
    <HousesContext.Provider value={value}>
      {children}
    </HousesContext.Provider>
  );
}

export default HousesProvider;
