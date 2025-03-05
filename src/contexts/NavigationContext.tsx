import { createContext } from 'react';
import INavigationContext from '../types/INavigationContext';

const NavigationContext = createContext<INavigationContext>({
  current: 'home',
  navigate: () => {},
});

export default NavigationContext;
