import { memo } from 'react';
import currencyFormatter from '../utils/currencyFormatter';
import { HouseListRowProps } from './interfaces';

function HouseListRow(props: HouseListRowProps) {
  const { rowData, selectHouse } = props;
  const {
    address, country, price,
  } = rowData;
  return (
    <tr
      className="cursor-pointer hover:bg-gray-200"
      onClick={() => selectHouse && selectHouse(rowData)}
    >
      <td className="border-b border-gray-300 px-4 py-2">{address}</td>
      <td className="border-b border-gray-300 px-4 py-2">{country}</td>
      <td className={`border-b border-gray-300 px-4 py-2 ${price >= 500000 ? 'text-blue-800' : ''}`}>
        {currencyFormatter.format(price)}
      </td>
    </tr>
  );
}

// cache component output if it is not changed
/*
  memo should not used blindly:
    - it has side effects
    - it use shellow rendering
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
