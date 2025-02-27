import { IHouse } from '../types/IHouse';

export interface BannerProps {
  headerText?: string,
  children?: React.ReactNode,
}

export interface HouseListRowProps {
  rowData: IHouse,
  selectHouse?: (house: IHouse) => void,
}

export interface HouseListProps {
  selectHouse?: (house: IHouse) => void,
}

export interface HouseProps {
  houseData: IHouse
}
