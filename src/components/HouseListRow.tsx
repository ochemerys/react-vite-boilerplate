import { useContext, memo } from 'react';
import currencyFormatter from '../utils/currencyFormatter';
import { HouseListRowProps } from './interfaces';
import NavigationContext from '../contexts/NavigationContext';
import navValues from '../utils/navValues';

function HouseListRow(props: HouseListRowProps) {
  const { rowData } = props;
  const {
    address, country, price,
  } = rowData;
  const { navigate } = useContext(NavigationContext);
  return (
    <tr
      role="row"
      className="cursor-pointer hover:bg-gray-200"
      onClick={() => {
        if (navigate) {
          navigate(navValues.house, rowData);
        }
      }}
    >
      <td className="border-b border-gray-300 px-4 py-2">{address}</td>
      <td className="border-b border-gray-300 px-4 py-2">{country}</td>
      <td className={`border-b border-gray-300 px-4 py-2 ${price >= 500000 ? 'text-blue-800' : ''}`}>
        {currencyFormatter.format(price)}
      </td>
    </tr>
  );
}

const HouseListRowMemo = memo(HouseListRow);
export default HouseListRowMemo;
export { HouseListRow };
