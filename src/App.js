import './App.css';
import HomePage from './pages/HomePage.js';
import Rosters from './pages/Rosters.js';
import TradeBuilder from './pages/TradeBuilder.js';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  const storedTeams = new Set();
  useEffect(() => {
    const stored = localStorage.getItem('stored');
    const teams = stored ? stored.split('+') : [];
    for (const team of teams) {
        storedTeams.add(team);
    }
  }, []);

  //for displaying a roster
  const [roster, setRoster] = useState([]);
  
  return (
    <div className='App'>
      <header className='App-header'>
        <Router>
          <Routes>
            <Route path='/' 
              element={<HomePage/>}>
            </Route>
            <Route path='/trade' element={ <TradeBuilder storedTeams={storedTeams}/>}>
            </Route>
            <Route path='/rosters' element={ <Rosters roster={roster}
                                                      setRoster={setRoster}/>}>
            </Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
