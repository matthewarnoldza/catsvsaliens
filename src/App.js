import React, { useState } from 'react';
import TopNavBar from './components/TopNavBar';
import AttractScreen from './components/RecruitScreen';
import CollectionScreen from './components/CollectionScreen';
import BattleScreen from './components/BattleScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('attract');
  const [collectedCats, setCollectedCats] = useState([]);

  const handleCatCaught = (newCat) => {
    setCollectedCats(prevCats => [...prevCats, newCat]);
  };

  const renderScreen = () => {
    switch(currentScreen) {
      case 'attract':
        return <AttractScreen onCatCaught={handleCatCaught} />;
      case 'collection':
        return <CollectionScreen collectedCats={collectedCats} />;
      case 'battle':
        return <BattleScreen collectedCats={collectedCats} />;
      default:
        return <AttractScreen onCatCaught={handleCatCaught} />;
    }
  };

  return (
    <div className="App">
      <TopNavBar setCurrentScreen={setCurrentScreen} />
      {renderScreen()}
    </div>
  );
}

export default App;
