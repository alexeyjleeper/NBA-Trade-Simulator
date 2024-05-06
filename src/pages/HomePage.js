import React from 'react';
import {useNavigate} from 'react-router-dom';
import HomeNav from '../components/HomeNav.js';

function HomePage({homeTooltip, 
                   homeNoti, 
                   showHomeTooltip, 
                   hideHomeTooltip, 
                   hideHomeNoti}) {
    const navigate = useNavigate();
    const navTrade = () => {
        navigate('/trade');
    }
    const navSearch = () => {
        navigate('/rosters');
    }
    const navHome = () => {
        navigate('/');
    }

    return(
        <div id='homePage'>
            <HomeNav homeTooltip={homeTooltip} 
                homeNoti={homeNoti} 
                showHomeTooltip={showHomeTooltip} 
                hideHomeTooltip={hideHomeTooltip} 
                hideHomeNoti={hideHomeNoti}
                homeFunc={navHome}/>
            <div class = 'homeNavButton' onClick={navTrade}>Trade Builder</div>
            <div class = 'homeNavButton' onClick={navSearch}>View Rosters</div>
        </div>
    );
}

export default HomePage;