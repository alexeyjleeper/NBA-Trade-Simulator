import './App.css';
import HomePage from './pages/HomePage.js';
import PlayerSearch from './pages/PlayerSearch.js';
import Rosters from './pages/Rosters.js';
import TradeBuilder from './pages/TradeBuilder.js';
import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  //home tooltip variables and functions
  const [homeTooltip, setHomeTooltip] = useState(false);
  const showHomeTooltip = () => {
    setHomeTooltip(true);
  }
  const hideHomeTooltip = () => {
    setHomeTooltip(false);

    //remove notification icon after user has hovered over home icon
    setHomeNoti(false);
  }

  //var to show home notification icon
  const [homeNoti, setHomeNoti] = useState(true);

  return (
    <div className='App'>
      <header className='App-header'>
        <Router>
          <Routes>
            <Route path='/' 
              element={<HomePage homeTooltip={homeTooltip} 
                                 homeNoti={homeNoti} 
                                 showHomeTooltip={showHomeTooltip} 
                                 hideHomeTooltip={hideHomeTooltip}/>}>
            </Route>
            <Route path='/trade' element={ <TradeBuilder homeTooltip={homeTooltip} 
                                                         homeNoti={homeNoti} 
                                                         showHomeTooltip={showHomeTooltip} 
                                                         hideHomeTooltip={hideHomeTooltip}/>}>
            </Route>
            <Route path='/rosters' element={ <Rosters homeTooltip={homeTooltip} 
                                                      homeNoti={homeNoti} 
                                                      showHomeTooltip={showHomeTooltip} 
                                                      hideHomeTooltip={hideHomeTooltip}/>}>
            </Route>
            <Route path='/trade/search' element={<PlayerSearch/>}></Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
