import { useContext, useState } from 'react';
import { post } from '../api/houses';
import IHouse from '../types/IHouse';
import { AddHouseProps } from './interfaces';
import houseApiBaseUrl from '../app.config';
import navValues from '../utils/navValues';
import NavigationContext from '../contexts/NavigationContext';

function AddHouse({ onAddHouse }: AddHouseProps) {
  const emptyHouse: IHouse = {
    id: '',
    address: '',
    country: '',
    price: 0,
  };
  const [newHouse, setNewHouse] = useState(emptyHouse);
  const { navigate } = useContext(NavigationContext);

  async function addHouseHandler() {
    const house = await post(houseApiBaseUrl, newHouse);
    onAddHouse(house);
    setNewHouse(emptyHouse);
    navigate(navValues.home);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex-grow text-center mb-8">
        <h2 className="text-xl font-bold text-yellow-700">Add New House</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
        <div>
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
        </div>
        <div>
          <input
            id="country"
            name="country"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={newHouse.country}
            placeholder="Enter Country"
            onChange={(e) => {
              setNewHouse({
                ...newHouse,
                country: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <input
            id="price"
            name="price"
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={newHouse.price}
            placeholder="Enter Price"
            onChange={(e) => {
              setNewHouse({
                ...newHouse,
                price: parseFloat(e.target.value),
              });
            }}
          />
        </div>
        <div className="container mx-auto p-4">
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(navValues.home)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={addHouseHandler}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddHouse;
