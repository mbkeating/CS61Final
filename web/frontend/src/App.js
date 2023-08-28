import './App.css';
import React, {useState} from 'react';
import Actor from './Actor';
import Query from './Query'

function App() {

  const [currentScreen, setCurrentScreen] = useState(0)

  const screens = [<Actor />, <Query />]

  return (
    <div className="App">
      <header className="App-header">
        <div style={{backgroundColor: 'black', width: '100%', height: '100px', display: 'flex', marginBottom: '10px'}}>
          <div style={{flex: 2}}>
            <p>Matt's IMDb study</p>
          </div>
          <div style={{flex: 1, display: 'flex'}}>
            <div onClick={() => setCurrentScreen(0)} style={{flex: 1, borderColor: 'white', borderWidth: 4}}>
              <p>Actors</p>
            </div>
            <div onClick={() => setCurrentScreen(1)} style={{flex: 1}}>
              <p style={{flex: 1}}>Queries</p>
            </div>
          </div>
        </div>
        
        <div style={{width: '100%'}}>
          {screens[currentScreen]}
        </div>
      </header>
    </div>
  );
}

export default App;
