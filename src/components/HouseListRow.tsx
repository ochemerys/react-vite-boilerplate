import { HouseListRowProps } from './interfaces';

function HouseListRow(props: HouseListRowProps) {
  const { rowData: { address, country, price } } = props;
  return (
    <tr>
      <td className="border-b border-gray-300 px-4 py-2">{address}</td>
      <td className="border-b border-gray-300 px-4 py-2">{country}</td>
      <td className="border-b border-gray-300 px-4 py-2">{price}</td>
    </tr>
  );
}

export default HouseListRow;
