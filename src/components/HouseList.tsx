import { useState } from 'react';
import { HouseListRow } from './HouseListRow';
import { post } from '../api/houses';
import useHouses from '../hooks/useHouses';
import loadingStatus from '../utils/loadingStatus';
import LoadingIndicator from './LoadingIndicator';
import IHouse from '../types/IHouse';
import houseApiBaseUrl from '../app.config';

function HouseList() {
  const emptyHouse:IHouse = {
    id: 0,
    address: '',
    country: '',
    price: 0,
  };

  const { houses, setHouses, loadingState } = useHouses();
  const [newHouse, setNewHouse] = useState(emptyHouse);

  if (loadingState !== loadingStatus.loaded) {
    return <LoadingIndicator loadingState={loadingState} />;
  }

  function addHouseHandler() {
    const add = async () => {
      const house = await post(houseApiBaseUrl, newHouse);

      setHouses([
        ...houses,
        house,
      ]);
    };
    add();
    setNewHouse(emptyHouse);
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
          {houses.map((h) => (<HouseListRow key={h.id} rowData={h} />))}
        </tbody>
        <tfoot>
          <tr>
            <td className="py-2 px-4 border-t">
              <form>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={newHouse.address}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter Address"
                  onChange={(e) => {
                    setNewHouse({
                      ...newHouse,
                      address: e.target.value,
                    });
                  }}
                />
              </form>
            </td>
            <td className="py-2 px-4 border-t">
              <input
                id="country"
                name="country"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={newHouse.country}
                onChange={(e) => {
                  setNewHouse({
                    ...newHouse,
                    country: e.target.value,
                  });
                }}
                placeholder="Enter Country"
              />
            </td>
            <td className="py-2 px-4 border-t">
              <input
                id="price"
                name="price"
                value={newHouse.price}
                onChange={(e) => {
                  setNewHouse({
                    ...newHouse,
                    price: parseFloat(e.target.value),
                  });
                }}
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter Price"
              />
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="flex justify-end p-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="button" onClick={addHouseHandler}>Add</button>
      </div>
    </div>
  );
}

export default HouseList;
