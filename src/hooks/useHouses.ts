import { useEffect, useState } from 'react';
import { fetchHouses } from '../api/houses-api';
import { IHouse } from '../types/IHouse';

function useHouses() {
  // state hook
  const [houses, setHouses] = useState([] as IHouse[]);

  // effect hook
  useEffect(() => {
    // does not support async function as parameter
    // that's why we need async getHouses function
    const getHouses = async () => {
      const houseArray = await fetchHouses();
      setHouses(houseArray);
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
  return { houses, setHouses };
}

export default useHouses;
