import { useContext } from 'react';
import navValues from '../utils/navValues';
import House from './House';
import HouseList from './HouseList';
import NavigationContext from '../contexts/NavigationContext';

interface ComponentPickerProps {
  currentNavLocation: string;
}
function ComponentPicker({ currentNavLocation }: ComponentPickerProps) {
  const { selectedHouse } = useContext(NavigationContext);
  switch (currentNavLocation) {
    case navValues.home:
      return <HouseList />;
    case navValues.house:
      return selectedHouse ? <House /> : null;
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
