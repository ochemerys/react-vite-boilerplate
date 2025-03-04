/* eslint-disable function-paren-newline */
import { IHouse } from '../types/IHouse';

const get = async (url: string | URL | Request) => {
  const resp = await fetch(url,
  //   , {
  //   cache: 'no-cache', // Prevent caching
  //   headers: {
  //     'Cache-Control': 'no-cache, no-store, must-revalidate',
  //     Pragma: 'no-cache',
  //     Expires: '0',
  //   },
  // }
  );
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
