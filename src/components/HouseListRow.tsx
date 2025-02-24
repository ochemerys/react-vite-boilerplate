import { memo } from 'react';
import currencyFormatter from '../utils/currencyFormatter';
import { HouseListRowProps } from './interfaces';

function HouseListRow(props: HouseListRowProps) {
  const { rowData: { address, country, price } } = props;
  return (
    <tr>
      <td className="border-b border-gray-300 px-4 py-2">{address}</td>
      <td className="border-b border-gray-300 px-4 py-2">{country}</td>
      <td className="border-b border-gray-300 px-4 py-2">{currencyFormatter.format(price)}</td>
    </tr>
  );
}

// cache component output if it is not changed
/*
  memo has side effects and should not used blindly:
  use React Dev Tools: Profiler to check performance with or without chacking
  for current application:
    - without caching: 0.2 ms
    - with caching: 0.3 ms
  conclussion: better not to use chaching for this component
*/
const HowseListRowMem = memo(HouseListRow);

export default HouseListRow;
// HowseListRowMem can be used on HouseList componrnt instead of HouseListRow
export { HowseListRowMem };
