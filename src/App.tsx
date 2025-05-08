import { useCallback, useState } from 'react';
import { IHouse } from './types/IHouse';

import Banner from './components/Banner';
import HouseList from './components/HouseList';
import House from './components/House';

function App() {
  const [selectedHouse, setSelectedHouse] = useState<IHouse | undefined>(
    undefined,
  );

  // const handleSelectHouse = (house: IHouse) => {
  //   // check if house data is valid
  //   setSelectedHouse(house);
  // };

  // The Callback Hook is to cache setSelectedHouse: use wisely
  const handleSelectHouse = useCallback((house: IHouse) => {
    // check if house data is valid
    setSelectedHouse(house);
  }, []); // with no dependencies

  return (
    <div className="min-h-screen bg-gray-100">
      <Banner>Providing houses all over the world</Banner>
      {
        // eslint-disable-next-line max-len
        selectedHouse ? (
          <House houseData={selectedHouse} />
        ) : (
          <HouseList selectHouse={handleSelectHouse} />
        )
      }
    </div>
  );
}

export default App;
