import { useEffect, useState } from 'react';
import { fetchHouses } from '../api/houses-api';
import { IHouse } from '../types/IHouse';
import loadingStatus from '../utils/loadingStatus';

function useHouses() {
  // state hook
  const [houses, setHouses] = useState([] as IHouse[]);
  const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

  // effect hook
  useEffect(() => {
    // does not support async function as parameter
    // that's why we need async getHouses function
    const getHouses = async () => {
      setLoadingState(loadingStatus.isLoading);
      try {
        const houseArray = await fetchHouses();
        // setTimeout(() => {
        setHouses(houseArray);
        setLoadingState(loadingStatus.loaded);
        // }, 1000);
      } catch {
        setLoadingState(loadingStatus.hasErrored);
      }
    };
    getHouses();
  }, []); // add empty dependency array: we have no dependenicies

  // memo hook: cache component houses if houses array is not changed
  // memo should not used blindly - it has side effects
  /*
    const result = useMemo(() => {
      return timeConsumingCalculation(houses)
    }, [houses]);
  */
  return { houses, setHouses, loadingState };
}

export default useHouses;
