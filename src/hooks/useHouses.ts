import { useEffect, useState } from 'react';
import { IHouse } from '../types/IHouse';
import useGetRequest from './useGetRequest';

function useHouses() {
  // state hook
  const [houses, setHouses] = useState([] as IHouse[]);
  const { get, loadingState } = useGetRequest('http://localhost:3000/houses');

  // effect hook
  useEffect(() => {
    // does not support async function as parameter
    // that's why we need async getHouses function
    const fetchHouses = async () => {
      const items = await get();
      setHouses(items);
    };
    fetchHouses();
  }, [get]);

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
