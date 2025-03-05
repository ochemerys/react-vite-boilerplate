import { useState, useCallback, useEffect } from 'react';
import './App.css';
import Banner from './components/Banner';
import navValues from './utils/navValues';
import ComponentPicker from './components/ComponentPicker';
import NavigationContext from './contexts/NavigationContext';
import { IHouse } from './types/IHouse';

interface NavigationState {
  current: string;
  selectedHouse?: IHouse;
  navigate: (navTo: string, house?: IHouse) => void;
}
function App() {
  const [nav, setNav] = useState<NavigationState>({
    current: navValues.home,
    navigate: () => {}, // Initialize with empty function
  });
  const navigate = useCallback(
    (navTo: string, house?: IHouse) => {
      setNav({ current: navTo, selectedHouse: house, navigate });
    },
    [setNav],
  );
  // Update navigate function in state
  useEffect(() => {
    setNav((prev) => ({ ...prev, navigate }));
  }, [navigate]);
  return (
    <NavigationContext.Provider value={nav}>
      <div className="min-h-screen bg-gray-100">
        <Banner>Providing houses all over the world</Banner>
        <ComponentPicker currentNavLocation={nav.current} />
      </div>
    </NavigationContext.Provider>
  );
}
export default App;
