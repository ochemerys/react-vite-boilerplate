import IHouse from './IHouse';

interface INavigationContext {
  current: string;
  selectedHouse?: IHouse;
  navigate: (navTo: string, house?: IHouse) => void;
}

export default INavigationContext;
