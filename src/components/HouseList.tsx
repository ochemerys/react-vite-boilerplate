import { useState } from 'react';
import HouseListRow from './HouseListRow';
import { HouseListProps } from './interfaces';
import { post } from '../api/houses';
import useHouses from '../hooks/useHouses';
import loadingStatus from '../utils/loadingStatus';
import LoadingIndicator from './LoadingIndicator';
import { IHouse } from '../types/IHouse';
import houseApiBaseUrl from '../app.config';

function HouseList(props: HouseListProps) {
  const { selectHouse } = props;
  const emptyHouse: IHouse = {
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

      setHouses([...houses, house]);
    };
    add();
    setNewHouse(emptyHouse);
  }

  return (
    <div className="container mx-auto">
      <div className="m-8 flex-grow text-center">
        <h1 className="text-2xl font-bold text-yellow-700">
          Houses currently on the market
        </h1>
      </div>
      <table className="mx-5 w-full">
        <thead>
          <tr>
            <th className="border-b border-gray-700 px-4 py-2">Address</th>
            <th className="border-b border-gray-700 px-4 py-2">Country</th>
            <th className="border-b border-gray-700 px-4 py-2">Asking Price</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((h) => (
            <HouseListRow key={h.id} rowData={h} selectHouse={selectHouse} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="border-t px-4 py-2">
              <form>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={newHouse.address}
                  className="w-full rounded border border-gray-300 p-2"
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
            <td className="border-t px-4 py-2">
              <input
                id="country"
                name="country"
                type="text"
                className="w-full rounded border border-gray-300 p-2"
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
            <td className="border-t px-4 py-2">
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
                className="w-full rounded border border-gray-300 p-2"
                placeholder="Enter Price"
              />
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="flex justify-end p-4">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          type="button"
          onClick={addHouseHandler}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default HouseList;
