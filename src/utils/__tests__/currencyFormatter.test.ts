import currencyFormatter from '../currencyFormatter';

describe('currencyFormatter util', () => {
  it('formats number into currency', () => {
    const num = 20.236653;
    expect(currencyFormatter.format(num)).toEqual('$20.24');
  });
});
