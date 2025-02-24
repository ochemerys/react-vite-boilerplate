const fetchHouses = async () => {
  const resp = await fetch('http://localhost:3000/houses');
  return resp.json();
};

const createHouse = async (address: string, country: string, price: number) => {
  const resp = await fetch('http://localhost:3000/houses', {
    method: 'POST',
    body: JSON.stringify({ address, country, price }),
  });
  return resp.json();
};

export { fetchHouses, createHouse };
