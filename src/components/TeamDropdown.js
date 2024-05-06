import {React, useState} from 'react';

function TeamDropdown() {
    const [selectTeam, setSelectTeam] = useState("Select a team");
    const [showDrop, setShowDrop] = useState(false);
    const changeSelect = event => {
        setSelectTeam(event.target.dataset.value);
        setShowDrop(false);
    }

    return (
        <div>
            <div class = 'dropSelectComp' onClick = {() => setShowDrop(true)}>
                {selectTeam}
            </div>
            {showDrop && (
                <ul class='teamSelectComp'>
                    <li onClick={changeSelect} data-value='Boston Celtics'>Boston Celtics</li>
                    <li onClick={changeSelect} data-value='Brooklyn Nets'>Brooklyn Nets</li>
                    <li onClick={changeSelect} data-value='New York Nets'>New York Knicks</li>
                    <li onClick={changeSelect} data-value='Philadelphia 76ers'>Philadelphia 76ers</li>
                    <li onClick={changeSelect} data-value='Toronto Raptors'>Toronto Raptors</li>
                    <li onClick={changeSelect} data-value='Chicago Bulls'>Chicago Bulls</li>
                    <li onClick={changeSelect} data-value='Clevland Cavaliers'>Cleveland Cavaliers</li>
                    <li onClick={changeSelect} data-value='Detroit Pistons'>Detroit Pistons</li>
                    <li onClick={changeSelect} data-value='Indiana Pacers'>Indiana Pacers</li>
                    <li onClick={changeSelect} data-value='Milwaukee Bucks'>Milwaukee Bucks</li>
                    <li onClick={changeSelect} data-value='Atlanta Hawks'>Atlanta Hawks</li>
                    <li onClick={changeSelect} data-value='Charlotte Hornets'>Charlotte Hornets</li>
                    <li onClick={changeSelect} data-value='Miami Heat'>Miami Heat</li>
                    <li onClick={changeSelect} data-value='Orlando Magic'>Orlando Magic</li>
                    <li onClick={changeSelect} data-value='Washington Wizards'>Washington Wizards</li>
                    <li onClick={changeSelect} data-value='Denver Nuggets'>Denver Nuggets</li>
                    <li onClick={changeSelect} data-value='Minnesota Timberwolves'>Minnesota Timberwolves</li>
                    <li onClick={changeSelect} data-value='Oklahoma City Thunder'>Oklahoma City Thunder</li>
                    <li onClick={changeSelect} data-value='Portland Trail Blazers'>Portland Trail Blazers</li>
                    <li onClick={changeSelect} data-value='Utah Jazz'>Utah Jazz</li>
                    <li onClick={changeSelect} data-value='Golden State Warriors'>Golden State Warriors</li>
                    <li onClick={changeSelect} data-value='Los Angeles Clippers'>Los Angeles Clippers</li>
                    <li onClick={changeSelect} data-value='Los Angeles Lakers'>Los Angeles Lakers</li>
                    <li onClick={changeSelect} data-value='Phoenix Suns'>Phoenix Suns</li>
                    <li onClick={changeSelect} data-value='Dallas Mavericks'>Dallas Mavericks</li>
                    <li onClick={changeSelect} data-value='Houston Rockets'>Houston Rockets</li>
                    <li onClick={changeSelect} data-value='Sacramento Kings'>Sacramento Kings</li>
                    <li onClick={changeSelect} data-value='Memphis Grizzlies'>Memphis Grizzlies</li>
                    <li onClick={changeSelect} data-value='New Orleans Pelicans'>New Orleans Pelicans</li>
                    <li onClick={changeSelect} data-value='San Antonio Spurs'>San Antonio Spurs</li>
                </ul>
            )}
        </div>
    )
}

export default TeamDropdown;