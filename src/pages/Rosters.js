import {React, useState, useEffect} from 'react';
import HomeNav from '../components/HomeNav.js';
import RosterTable from '../components/RosterTable.js';
import Select from 'react-select';
import ScoreContainer from '../components/ScoreContainer.js';
import Teams from '../storage/Teams.js';

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
        padding: '5px',
        backgroundColor: 'white',
        cursor: 'pointer'
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
            cursor: 'select',
            filter: 'brightness(70%)'
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
                        options={Teams}
                        onChange={updateTeam}
                        placeholder="Select a Team"/>
            </div>
            <ScoreContainer team={selectTeam} scoreArrays={scoreArrays}/>
            <RosterTable team={selectTeam} roster={roster}/>
        </div>
    )
}

export default Rosters;