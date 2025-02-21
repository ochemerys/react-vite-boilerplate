import HouseListRow from './HouseListRow';

function HouseList() {
  const houseArray = [
    {
      id: 1,
      address: '12 Valley of Kings, Geneva',
      country: 'Switzerland',
      price: 900000,
    },
    {
      id: 2,
      address: '89 Road of Forks, Bern',
      country: 'Switzerland',
      price: 500000,
    },
  ];
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
          {houseArray.map((h) => (<HouseListRow key={h.id} rowData={h} />))}
        </tbody>
      </table>
    </div>
  );
}

export default HouseList;
