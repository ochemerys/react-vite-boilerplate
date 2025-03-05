import { createContext } from 'react';
import { IHouse } from '../types/IHouse';

interface NavigationContextType {
  current: string;
  selectedHouse?: IHouse;
  navigate: (navTo: string, house?: IHouse) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  current: 'home',
  navigate: () => {},
});

export default NavigationContext;
