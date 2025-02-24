import { IHouse } from '../types/IHouse';

export interface BannerProps {
  headerText?: string,
  children?: React.ReactNode,
}

export interface HouseListRowProps {
  rowData?: IHouse,
}
