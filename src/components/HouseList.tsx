import { useState, useEffect } from 'react';
import HouseListRow from './HouseListRow';
import { IHouse } from '../types/IHouse';
import { HouseListProps } from './interfaces';
import { fetchHouses, createHouse } from '../api/houses-api';

function HouseList(props: HouseListProps) {
  const { selectHouse } = props;
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

  function addHouse() {
    const newHouse = {
      address: '123 Main St. Edmonton',
      country: 'Canada',
      price: 100000,
    };

    const add = async () => {
      const house = await createHouse(newHouse.address, newHouse.country, newHouse.price);

      setHouses([
        ...houses,
        house,
      ]);
    };
    add();
  }

  return (
    <div className="container mx-auto">
      <div className="flex-grow text-center m-8">
        <h1 className="text-2xl font-bold text-yellow-700">Houses currently on the market</h1>
      </div>
      <table className="w-full mx-5">
        <thead>
          <tr>
            <th className="border-b border-gray-700 px-4 py-2">Address</th>
            <th className="border-b border-gray-700 px-4 py-2">Country</th>
            <th className="border-b border-gray-700 px-4 py-2">Asking Price</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((h) => (<HouseListRow key={h.id} rowData={h} selectHouse={selectHouse} />))}
        </tbody>
      </table>
      <div className="flex justify-end p-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="button" onClick={addHouse}>Add</button>
      </div>
    </div>
  );
}

export default HouseList;
