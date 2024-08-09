import {React, useState} from 'react';
import HomeNav from '../components/HomeNav.js';
import {MdRadioButtonChecked} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import RosterTable from '../components/RosterTable.js';

function Rosters({homeTooltip, 
                  homeNoti, 
                  showHomeTooltip, 
                  hideHomeTooltip, 
                  hideHomeNoti,
                  roster,
                  setRoster}) {
    const [selectTeam, setSelectTeam] = useState("Select a team");
    const [showDrop, setShowDrop] = useState(false);
    const [rosterTooltip, setRosterTooltip] = useState(false);
    const [rosterNoti, setRosterNoti] = useState(true);
    const [logoImg, setLogoImg] = useState(false);

    const changeSelect = event => {
        setSelectTeam(event.target.dataset.value);
        setShowDrop(false);
        
        const team = event.target.dataset.value;
        const logoQueryTeam = team.replace(/ /g, '_');
        
        let url = 'http://localhost:8000/' + logoQueryTeam;

        //request for team logo
        console.log('request to imgMicroservice');
        fetch(url, {method: 'GET'})
            .then(response => {
                return response.text();
            })
            .then(data => {

                //get image from the url
                fetch(`${data}`, {method: 'GET'})
                    .then(response => {
                        console.log('reponse: ', response);
                        return response.blob();
                    })
                    .then(blob => {
                        const image = URL.createObjectURL(blob);
                        setLogoImg(image);
                    })
                    .catch(error => {
                        // Handle errors
                        console.log('Error:', error);
                    });
            })
            .catch(error => {
                // Handle errors
                console.log('Error:', error);
            });

        const rosterQuery = JSON.stringify([`${team}`]);

        url = 'http://localhost:4000/team';

        //request for roster info
        console.log('request to playerSearch');
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/Json'
            },
            body: rosterQuery
        })
            .then(response => {
                console.log('response: ', response);
                return response.json();
            })
            .then(data => {
                setRoster(data);
            })
            .catch(err => {
                console.log('Error contacting search /team node: ', err);
            });

    }

    const showRosterTooltip = () => {
        setRosterTooltip(true);
    }
    const hideRosterTooltip = () => {
        setRosterTooltip(false);
        setRosterNoti(false);
    }
    const navigate = useNavigate();
    const navHome = () => {
        navigate('/');
    }
    return(
        <div id='rosterPage'>
            <HomeNav homeNoti={homeNoti} homeFunc={navHome}/>
            {logoImg && (
                <div id='logo'>
                    <img src={logoImg} alt='team logo'/>
                </div>
            )}
            <div id ='dropSelect' 
                onClick = {() => setShowDrop(true)}
                onMouseEnter={showRosterTooltip} 
                onMouseLeave={hideRosterTooltip}>
                {selectTeam}
            </div>
            {selectTeam !== 'Select a team' && (<RosterTable roster={roster}/>)}
            {rosterNoti && (<MdRadioButtonChecked id = 'rosterNoti'/>)}
            {rosterTooltip && (
                <div class='tooltip' id='rosterTooltip'>
                    Click to display the dropdown menu and select a team to view the roster.
                </div>
            )}
            {showDrop && (
                <ul id='teamSelect'>
                    <li onClick={changeSelect} data-value='Boston Celtics'>Boston Celtics</li>
                    <li onClick={changeSelect} data-value='Brooklyn Nets'>Brooklyn Nets</li>
                    <li onClick={changeSelect} data-value='New York Knicks'>New York Knicks</li>
                    <li onClick={changeSelect} data-value='Philadelphia 76ers'>Philadelphia 76ers</li>
                    <li onClick={changeSelect} data-value='Toronto Raptors'>Toronto Raptors</li>
                    <li onClick={changeSelect} data-value='Chicago Bulls'>Chicago Bulls</li>
                    <li onClick={changeSelect} data-value='Cleveland Cavaliers'>Cleveland Cavaliers</li>
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

export default Rosters;