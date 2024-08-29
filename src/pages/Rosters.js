import {React, useState, useEffect} from 'react';
import HomeNav from '../components/HomeNav.js';
import RosterTable from '../components/RosterTable.js';
import Select from 'react-select';
import ScoreContainer from '../components/ScoreContainer.js';

const rostersStyles = {
    menu: (provided) => ({
        ...provided,
        margin: 0,
        borderRadius: 0,
        fontWeight: 450
    }),
    menuList: (provided) => ({
        ...provided,
        overflowX: 'hidden'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'black'
    }),
    option: (provided) => ({
        ...provided,
        color: 'black',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        padding: '5px'
    }),
    control: (provided, state) => ({
        ...provided,
        fontWeight: '450',
        width: '100%',
        background: 'white',
        color: 'black',
        boxShadow: 'none',
        borderColor: state.isFocused ? 'transparent' : 'transparent',
        cursor: 'pointer',
        '&:hover': {
            borderColor: 'transparent',
            cursor: 'select'
        },
        borderRadius: 0
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: state.selectProps.menuIsOpen ? '#363636' : '#575757'
      }),  
    input: (provided) => ({
        ...provided,
        caretColor: 'transparent'
    }),      
    placeholder: (provided) => ({
        ...provided,
        color: 'black',
        fontFamily: 'Montserrat',
        whiteSpace: 'nowrap',
        fontWeight: '450'
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none'
    })
}

const teams = [
    { value: "Atlanta Hawks", label: "Atlanta Hawks"},
    { value: "Boston Celtics", label: "Boston Celtics"},
    { value: "Brooklyn Nets", label: "Brooklyn Nets"},
    { value: "Charlotte Hornets", label: "Charlotte Hornets"},
    { value: "Chicago Bulls", label: "Chicago Bulls"},
    { value: "Cleveland Cavaliers", label: "Cleveland Cavaliers"},
    { value: "Dallas Mavericks", label: "Dallas Mavericks"},
    { value: "Denver Nuggets", label: "Denver Nuggets"},
    { value: "Detroit Pistons", label: "Detroit Pistons"},
    { value: "Golden State Warriors", label: "Golden State Warriors"},
    { value: "Houston Rockets", label: "Houston Rockets"},
    { value: "Indiana Pacers", label: "Indiana Pacers"},
    { value: "Los Angeles Clippers", label: "Los Angeles Clippers"},
    { value: "Los Angeles Lakers", label: "Los Angeles Lakers"},
    { value: "Memphis Grizzlies", label: "Memphis Grizzlies"},
    { value: "Miami Heat", label: "Miami Heat"},
    { value: "Milwaukee Bucks", label: "Milwaukee Bucks"},
    { value: "Minnesota Timberwolves", label: "Minnesota Timberwolves"},
    { value: "New Orleans Pelicans", label: "New Orleans Pelicans"},
    { value: "New York Knicks", label: "New York Knicks"},
    { value: "Oklahoma City Thunder", label: "Oklahoma City Thunder"},
    { value: "Orlando Magic", label: "Orlando Magic"},
    { value: "Philadelphia 76ers", label: "Philadelphia 76ers"},
    { value: "Phoenix Suns", label: "Phoenix Suns"},
    { value: "Portland Trail Blazers", label: "Portland Trail Blazers"},
    { value: "Sacramento Kings", label: "Sacramento Kings"},
    { value: "San Antonio Spurs", label: "San Antonio Spurs"},
    { value: "Toronto Raptors", label: "Toronto Raptors"},
    { value: "Utah Jazz", label: "Utah Jazz"},
    { value: "Washington Wizards", label: "Washington Wizards"}
]

function Rosters({uuid}) {
    const [selectTeam, setSelectTeam] = useState("Select a team");
    const [scoreArrays, setScoreArrays] = useState([[]]);
    const [roster, setRoster] = useState([]);

    useEffect(() => {
        if (selectTeam !== 'Select a team') {
            const storedTeams = localStorage.getItem('dbTeams');
            const teams = JSON.parse(storedTeams);
            if (teams.includes(selectTeam)) {
                const storedData = localStorage.getItem(selectTeam);
                const data = JSON.parse(storedData);
                setScoreArrays(data[0]);
                setRoster(data[1]);
            } else {
                const team = selectTeam;
                const teamToURL = team.replace(/ /g, '+');
                const url = `http://localhost:4000/?uuid=${uuid}&team=${teamToURL}&db=false`;
                fetch(url, { method: 'GET'})
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        setScoreArrays([data.Score]);
                        setRoster(data.Players);
                    })
                    .catch(err => {
                        console.log('Error: ', err);
                    });
            }
        }
    }, [selectTeam]);

    function updateTeam(selectedOption) {
        setSelectTeam(selectedOption.label);
    }
    

    return(
        <div id='rosterPage'>
            <div className='navButtons'>
                <HomeNav/>
            </div>
            <div id='rosterSelectContainer'>
                <Select styles={rostersStyles} 
                        options={teams}
                        onChange={updateTeam}
                        placeholder="Select a Team"/>
            </div>
            <ScoreContainer team={selectTeam} scoreArrays={scoreArrays}/>
            <RosterTable team={selectTeam} roster={roster}/>
        </div>
    )
}

export default Rosters;