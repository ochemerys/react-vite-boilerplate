import { IHouse } from '../types/IHouse';

const get = async (url: string | URL | Request) => {
  const resp = await fetch(url);
  return resp.json();
};

const post = async (url: string | URL | Request, house:IHouse) => {
  const { address, country, price } = house;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ address, country, price }),
  });
  return resp.json();
};

export { get, post };
