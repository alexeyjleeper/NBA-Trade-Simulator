import {React, useState} from 'react';
import HomeNav from '../components/HomeNav.js';
import {useNavigate} from 'react-router-dom';
import {MdRadioButtonChecked} from 'react-icons/md';

function TradeBuilder({homeTooltip,
                       homeNoti, 
                       showHomeTooltip, 
                       hideHomeTooltip, 
                       hideHomeNoti}) {
    const [selectTeamLeft, setSelectTeamLeft] = useState("Select a team");
    const [showDropLeft, setShowDropLeft] = useState(false);
    const changeSelectL = event => {
        setSelectTeamLeft(event.target.dataset.value);
        setShowDropLeft(false);
    }
    const [selectTeamRight, setSelectTeamRight] = useState("Select a team");
    const [showDropRight, setShowDropRight] = useState(false);
    const changeSelectR = event => {
        setSelectTeamRight(event.target.dataset.value);
        setShowDropRight(false);
    }

    const [playerTooltip, setPlayerTooltip] = useState(false);
    const showPlayerTooltip = () => {
        setPlayerTooltip(true);
    }

    const [playerNoti, setPlayerNoti] = useState(true);
    const hidePlayerNoti = () => {
        setPlayerNoti(false);
        setPlayerTooltip(false);
    }
    
    const [saveCheck, setSaveCheck] = useState(false);
    const doubleCheck = () => {
        setSaveCheck(true);
    }
    const hideDouble = () => {
        setSaveCheck(false);
    }
    
    const navigate = useNavigate();

    const navHome = () => {
        navigate('/');
    }
    return(
        <div id='tradePage'>
            <div id='transact'>
                <div id='leftTransact'>
                    <div class='addPlayer'>
                        <div onMouseEnter={showPlayerTooltip} onMouseLeave={hidePlayerNoti}>
                            + Add Player
                        </div>
                        {playerNoti && (<MdRadioButtonChecked id='playerNoti'/>)}
                    </div>
                    <div>
                        {playerTooltip && (
                            <div className='tooltip' id = 'addPlayerTooltip'>
                                Clicking this button will send you to the
                                player search page. A back button will
                                allow you to navigate back to this page
                                if no player is selected.
                            </div>
                        )}
                    </div>
                </div>
                <div id='divider'></div>
                <div id='rightTransact'>
                    <div class='addPlayer'>+ Add Player</div>
                </div>
            </div>
            <div id = 'dropSelectLeft' onClick = {() => setShowDropLeft(true)}>
                {selectTeamLeft}
            </div>
            <span>
                {showDropLeft && (
                    <ul id='teamSelectLeft'>
                        <li onClick={changeSelectL} data-value='Boston Celtics'>Boston Celtics</li>
                        <li onClick={changeSelectL} data-value='Brooklyn Nets'>Brooklyn Nets</li>
                        <li onClick={changeSelectL} data-value='New York Knicks'>New York Knicks</li>
                        <li onClick={changeSelectL} data-value='Philadelphia 76ers'>Philadelphia 76ers</li>
                        <li onClick={changeSelectL} data-value='Toronto Raptors'>Toronto Raptors</li>
                        <li onClick={changeSelectL} data-value='Chicago Bulls'>Chicago Bulls</li>
                        <li onClick={changeSelectL} data-value='Clevland Cavaliers'>Cleveland Cavaliers</li>
                        <li onClick={changeSelectL} data-value='Detroit Pistons'>Detroit Pistons</li>
                        <li onClick={changeSelectL} data-value='Indiana Pacers'>Indiana Pacers</li>
                        <li onClick={changeSelectL} data-value='Milwaukee Bucks'>Milwaukee Bucks</li>
                        <li onClick={changeSelectL} data-value='Atlanta Hawks'>Atlanta Hawks</li>
                        <li onClick={changeSelectL} data-value='Charlotte Hornets'>Charlotte Hornets</li>
                        <li onClick={changeSelectL} data-value='Miami Heat'>Miami Heat</li>
                        <li onClick={changeSelectL} data-value='Orlando Magic'>Orlando Magic</li>
                        <li onClick={changeSelectL} data-value='Washington Wizards'>Washington Wizards</li>
                        <li onClick={changeSelectL} data-value='Denver Nuggets'>Denver Nuggets</li>
                        <li onClick={changeSelectL} data-value='Minnesota Timberwolves'>Minnesota Timberwolves</li>
                        <li onClick={changeSelectL} data-value='Oklahoma City Thunder'>Oklahoma City Thunder</li>
                        <li onClick={changeSelectL} data-value='Portland Trail Blazers'>Portland Trail Blazers</li>
                        <li onClick={changeSelectL} data-value='Utah Jazz'>Utah Jazz</li>
                        <li onClick={changeSelectL} data-value='Golden State Warriors'>Golden State Warriors</li>
                        <li onClick={changeSelectL} data-value='Los Angeles Clippers'>Los Angeles Clippers</li>
                        <li onClick={changeSelectL} data-value='Los Angeles Lakers'>Los Angeles Lakers</li>
                        <li onClick={changeSelectL} data-value='Phoenix Suns'>Phoenix Suns</li>
                        <li onClick={changeSelectL} data-value='Dallas Mavericks'>Dallas Mavericks</li>
                        <li onClick={changeSelectL} data-value='Houston Rockets'>Houston Rockets</li>
                        <li onClick={changeSelectL} data-value='Sacramento Kings'>Sacramento Kings</li>
                        <li onClick={changeSelectL} data-value='Memphis Grizzlies'>Memphis Grizzlies</li>
                        <li onClick={changeSelectL} data-value='New Orleans Pelicans'>New Orleans Pelicans</li>
                        <li onClick={changeSelectL} data-value='San Antonio Spurs'>San Antonio Spurs</li>
                    </ul>
                )}
            </span>
            <div id = 'dropSelectRight' onClick = {() => setShowDropRight(true)}>
                {selectTeamRight}
            </div>
            <span>
                {showDropRight && (
                    <ul id='teamSelectRight'>
                        <li onClick={changeSelectR} data-value='Boston Celtics'>Boston Celtics</li>
                        <li onClick={changeSelectR} data-value='Brooklyn Nets'>Brooklyn Nets</li>
                        <li onClick={changeSelectR} data-value='New York Knicks'>New York Knicks</li>
                        <li onClick={changeSelectR} data-value='Philadelphia 76ers'>Philadelphia 76ers</li>
                        <li onClick={changeSelectR} data-value='Toronto Raptors'>Toronto Raptors</li>
                        <li onClick={changeSelectR} data-value='Chicago Bulls'>Chicago Bulls</li>
                        <li onClick={changeSelectR} data-value='Clevland Cavaliers'>Cleveland Cavaliers</li>
                        <li onClick={changeSelectR} data-value='Detroit Pistons'>Detroit Pistons</li>
                        <li onClick={changeSelectR} data-value='Indiana Pacers'>Indiana Pacers</li>
                        <li onClick={changeSelectR} data-value='Milwaukee Bucks'>Milwaukee Bucks</li>
                        <li onClick={changeSelectR} data-value='Atlanta Hawks'>Atlanta Hawks</li>
                        <li onClick={changeSelectR} data-value='Charlotte Hornets'>Charlotte Hornets</li>
                        <li onClick={changeSelectR} data-value='Miami Heat'>Miami Heat</li>
                        <li onClick={changeSelectR} data-value='Orlando Magic'>Orlando Magic</li>
                        <li onClick={changeSelectR} data-value='Washington Wizards'>Washington Wizards</li>
                        <li onClick={changeSelectR} data-value='Denver Nuggets'>Denver Nuggets</li>
                        <li onClick={changeSelectR} data-value='Minnesota Timberwolves'>Minnesota Timberwolves</li>
                        <li onClick={changeSelectR} data-value='Oklahoma City Thunder'>Oklahoma City Thunder</li>
                        <li onClick={changeSelectR} data-value='Portland Trail Blazers'>Portland Trail Blazers</li>
                        <li onClick={changeSelectR} data-value='Utah Jazz'>Utah Jazz</li>
                        <li onClick={changeSelectR} data-value='Golden State Warriors'>Golden State Warriors</li>
                        <li onClick={changeSelectR} data-value='Los Angeles Clippers'>Los Angeles Clippers</li>
                        <li onClick={changeSelectR} data-value='Los Angeles Lakers'>Los Angeles Lakers</li>
                        <li onClick={changeSelectR} data-value='Phoenix Suns'>Phoenix Suns</li>
                        <li onClick={changeSelectR} data-value='Dallas Mavericks'>Dallas Mavericks</li>
                        <li onClick={changeSelectR} data-value='Houston Rockets'>Houston Rockets</li>
                        <li onClick={changeSelectR} data-value='Sacramento Kings'>Sacramento Kings</li>
                        <li onClick={changeSelectR} data-value='Memphis Grizzlies'>Memphis Grizzlies</li>
                        <li onClick={changeSelectR} data-value='New Orleans Pelicans'>New Orleans Pelicans</li>
                        <li onClick={changeSelectR} data-value='San Antonio Spurs'>San Antonio Spurs</li>
                    </ul>
                )}
            </span>
            <HomeNav homeTooltip={homeTooltip} 
                homeNoti={homeNoti} 
                showHomeTooltip={showHomeTooltip} 
                hideHomeTooltip={hideHomeTooltip} 
                hideHomeNoti={hideHomeNoti}
                homeFunc={doubleCheck}/>
            {saveCheck && (
                <div id='doubleCheck'>
                    <div id='doubleCheckMsg'>
                        Are you sure you want to return 
                        to home? Any unsubmitted trades 
                        will lose all progress.
                    </div>
                    <div id='tradeNavCancel' onClick={hideDouble}>
                        Cancel
                    </div>
                    <div id='tradeNavHome' onClick={navHome}>
                        Home
                    </div>
                </div>
            )}
        </div>
    )
}

export default TradeBuilder;