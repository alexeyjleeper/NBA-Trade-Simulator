import './App.css';
import HomePage from './pages/HomePage.js';
import Rosters from './pages/Rosters.js';
import TradeBuilder from './pages/TradeBuilder.js';
import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  //var to show home notification icon
  const [homeNoti, setHomeNoti] = useState(true);

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

  //vars for each side of trade
  const [leftList, setLeftList] = useState(["Lebron James", "Anthony Davis"]);
  const [rightList, setRightList] = useState(["Deni Avdija", "Deandre Ayton", "2025 1st Round Pick", "2025 2nd Round Pick"]);
  
  //for updating each side of the trade
  const [currList, setCurrList] = useState('');

  //dropdown selected options for trade page
  const [selectTeamLeft, setSelectTeamLeft] = useState("Select a team");
  const [selectTeamRight, setSelectTeamRight] = useState("Select a team");

  const [playerTooltip, setPlayerTooltip] = useState(false);
  const showPlayerTooltip = () => {
    setPlayerTooltip(true);
  }

  const [playerNoti, setPlayerNoti] = useState(true);
  const hidePlayerNoti = () => {
    setPlayerNoti(false);
    setPlayerTooltip(false);
  }

  //reset icon tool tip visibility variable
  const [tooltip, setTooltip] = useState(false);
  const hideTooltip = () => {
    setTooltip(false);
  }
  const showTooltip = () => {
    setTooltip(true);
  }

  //for displaying a roster
  const [roster, setRoster] = useState([]);

  //add players to each side of the trade in the state variables
  function updateList(event) {
    if (currList === 'left'){
        let list = leftList;
        if (!list.includes(event.target.textContent)) {
            list.push(event.target.textContent);
            setLeftList(list)
        }
    } else {
        let list = rightList;
        if (!list.includes(event.target.textContent)) {
            list.push(event.target.textContent);
            setRightList(list)
        }
    }
  }

  //delete trade items from lists
  function deleteAsset(event) {
    
    //get player
    const removePlayer = event.currentTarget.parentNode.textContent;

    //remove player from list
    const left = [];

    for (let i of leftList) {
      left.push(i)
    }

    const right = rightList;
    if (left.includes(`${removePlayer}`)) {
      const newList = [];
      for (let i in left) {
        if (i !== removePlayer) {
          newList.push(i);
        }
      }
      setLeftList(newList)
    } else if (right.includes(`${removePlayer}`)) {
      const newList = [];
      for (let i in right) {
        if (i !== removePlayer) {
          newList.push(i);
        }
      }
      setRightList(newList);
    }
  }
  
  return (
    <div className='App'>
      <header className='App-header'>
        <Router>
          <Routes>
            <Route path='/' 
              element={<HomePage homeTooltip={homeTooltip} 
                                 homeNoti={homeNoti} 
                                 showHomeTooltip={showHomeTooltip} 
                                 hideHomeTooltip={hideHomeTooltip}
                                 tooltip={tooltip}
                                 hideTooltip={hideTooltip}
                                 showTooltip={showTooltip}/>}>
            </Route>
            <Route path='/trade' element={ <TradeBuilder homeTooltip={homeTooltip} 
                                                         homeNoti={homeNoti} 
                                                         showHomeTooltip={showHomeTooltip} 
                                                         hideHomeTooltip={hideHomeTooltip}
                                                         leftList = {leftList}
                                                         rightList = {rightList}
                                                         setCurrList = {setCurrList}
                                                         selectTeamLeft={selectTeamLeft}
                                                         setSelectTeamLeft={setSelectTeamLeft}
                                                         selectTeamRight={selectTeamRight}
                                                         setSelectTeamRight={setSelectTeamRight}
                                                         showPlayerTooltip={showPlayerTooltip}
                                                         hidePlayerNoti={hidePlayerNoti}
                                                         playerTooltip={playerTooltip}
                                                         playerNoti={playerNoti}
                                                         deleteAsset={deleteAsset}/>}>
            </Route>
            <Route path='/rosters' element={ <Rosters homeTooltip={homeTooltip} 
                                                      homeNoti={homeNoti} 
                                                      showHomeTooltip={showHomeTooltip} 
                                                      hideHomeTooltip={hideHomeTooltip}
                                                      roster={roster}
                                                      setRoster={setRoster}/>}>
            </Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
