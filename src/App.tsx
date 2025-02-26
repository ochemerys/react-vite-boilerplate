import { useState } from 'react';
import './App.css';
import { IHouseRow } from './types/IHouseRow';

import Banner from './components/Banner';
import HouseList from './components/HouseList';
import House from './components/House';

function App() {
  const [selectedHouse, setSelectedHouse] = useState<IHouseRow | undefined>(undefined);

  const handleSelectHouse = (house: IHouseRow) => {
    setSelectedHouse(house);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Banner>Providing houses all over the world</Banner>
      {
        selectedHouse ? <House /> : <HouseList selectHouse={handleSelectHouse} />
      }
    </div>
  );
}

export default App;
