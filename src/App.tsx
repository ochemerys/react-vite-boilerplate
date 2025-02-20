import './App.css';

import Banner from './components/Banner';
import HouseList from './components/HouseList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Banner>Providing houses all over the world</Banner>
      <HouseList />
    </div>
  );
}

export default App;
