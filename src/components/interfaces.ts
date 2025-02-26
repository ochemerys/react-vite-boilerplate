import { IHouseRow } from '../types/IHouseRow';

export interface BannerProps {
  headerText?: string,
  children?: React.ReactNode,
}

export interface HouseListRowProps {
  rowData: IHouseRow,
  selectHouse?: (house: IHouseRow) => void,
}

export interface HouseListProps {
  selectHouse?: (house: IHouseRow) => void,
}
