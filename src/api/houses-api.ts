const fetchHouses = async () => {
  const resp = await fetch('http://localhost:3000/houses');
  return resp.json();
};

export default fetchHouses;
