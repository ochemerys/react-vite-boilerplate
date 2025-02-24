import { useState, useEffect } from 'react';
import HouseListRow from './HouseListRow';
import { IHouse } from '../types/IHouse';
import fetchHouses from '../api/houses-api';

function HouseList() {
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

  const addHouse = () => {
    setHouses([
      ...houses,
      {
        id: 3,
        address: '123 Main St. Edmonton',
        country: 'Canada',
        price: 100000,
      },
    ]);
  };

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
          {houses.map((h) => (<HouseListRow key={h.id} rowData={h} />))}
        </tbody>
      </table>
      <div className="flex justify-end p-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="button" onClick={addHouse}>Add</button>
      </div>
    </div>
  );
}

export default HouseList;
