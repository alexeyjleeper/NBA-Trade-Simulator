import React from 'react';
import {useNavigate} from 'react-router-dom';
import Reset from '../components/Reset.js';
import HomeNav from '../components/HomeNav.js';
import { MdArrowForwardIos } from "react-icons/md";

function HomePage({homeTooltip, 
                   homeNoti, 
                   showHomeTooltip, 
                   hideHomeTooltip, 
                   hideHomeNoti,
                   tooltip,
                   hideTooltip,
                   showTooltip}) {
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
            <div id="navButtons">
                <HomeNav homeTooltip={homeTooltip} 
                    homeNoti={homeNoti} 
                    showHomeTooltip={showHomeTooltip} 
                    hideHomeTooltip={hideHomeTooltip} 
                    hideHomeNoti={hideHomeNoti}
                    homeFunc={navHome}/>
                <Reset tooltip={tooltip} hideTooltip={hideTooltip} showTooltip={showTooltip}/>
            </div>
            <div class='homeNavButton'
                 id='tradeBuilderButton'
                 onClick={navTrade}>
                <p>Trade Builder</p>
                <MdArrowForwardIos id='tbArrow'/>
            </div>
            <div class='homeNavButton'
                 id='viewRostersButton'
                 onClick={navSearch}>
                <p>View Rosters</p>
                <MdArrowForwardIos id='vrArrow'/>
            </div>
        </div>
    );
}

export default HomePage;