import './App.css';
import HomePage from './pages/HomePage.js';
import Rosters from './pages/Rosters.js';
import TradeBuilder from './pages/TradeBuilder.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { v4 } from 'uuid';

function App() {
  let uuid = "";

  uuid = localStorage.getItem('uuid');
  if (!uuid) {
      uuid = v4();
      localStorage.setItem('uuid', uuid);
  }
  
  return (
    <div className='App'>
      <header className='App-header'>
        <Router>
          <Routes>
            <Route path='/' 
              element={<HomePage uuid={uuid}/>}>
            </Route>
            <Route path='/trade' element={ <TradeBuilder uuid={uuid}/>}>
            </Route>
            <Route path='/rosters' element={ <Rosters uuid={uuid}/>}>
            </Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
