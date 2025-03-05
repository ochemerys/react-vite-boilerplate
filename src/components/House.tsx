import { useContext } from 'react';
import currencyFormatter from '../utils/currencyFormatter';
import NavigationContext from '../contexts/NavigationContext';

function House() {
  const { selectedHouse } = useContext(NavigationContext);
  if (!selectedHouse) return <div>No house selected</div>;
  const houseData = selectedHouse;
  const {
    address, country, price, description, image,
  } = houseData;
  return (
    <div className="container mx-auto">
      <div className="flex-grow text-center m-8">
        <h1 className="text-2xl font-bold text-yellow-700">House on the market</h1>
      </div>
      <div className="flex h-screen gap-4">
        <div className="w-1/2 items-center">
          <img src={`/houseImages/${image || 'default-house.png'}`} alt="house" className="w-full h-auto object-cover" />
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          <div className="text-2xl">{country}</div>
          <div className="text-3xl">{address}</div>
          <div className="text-yellow-600 text-4xl">{currencyFormatter.format(price)}</div>
          <div className="flex items-center justify-center">{description}</div>
        </div>
      </div>
    </div>
  );
}
export default House;
