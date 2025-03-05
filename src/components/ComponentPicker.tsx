import { useContext } from 'react';
import navValues from '../utils/navValues';
import House from './House';
import HouseList from './HouseList';
import NavigationContext from '../contexts/NavigationContext';
import { ComponentPickerProps } from './interfaces';
import AddHouse from './AddHouse';
import { useHousesContext } from '../contexts/HousesContext';

function ComponentPicker({ currentNavLocation }: ComponentPickerProps) {
  const { selectedHouse } = useContext(NavigationContext);
  const { addHouse } = useHousesContext();
  const { navigate } = useContext(NavigationContext);

  switch (currentNavLocation) {
    case navValues.home:
      return (
        <>
          <HouseList />
          <div className="container mx-auto">
            <div className="flex justify-end my-4">
              <button
                type="button"
                onClick={() => navigate(navValues.addHouse)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add House
              </button>
            </div>
          </div>
        </>
      );
    case navValues.house:
      return selectedHouse ? <House /> : null;
    case navValues.addHouse:
      return <AddHouse onAddHouse={addHouse} />;
    default:
      return (
        <h3>
          No Component for navigation value
          {currentNavLocation}
          found
        </h3>
      );
  }
}

export default ComponentPicker;
