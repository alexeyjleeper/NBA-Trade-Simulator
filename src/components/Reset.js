import {React} from 'react';
import {MdRefresh} from 'react-icons/md';

function Reset({uuid}) {
    
    //function to reset storage of microservices
    function clear() {
        const url = 'http://3.235.176.139:8080/';
        const storedTeams = localStorage.getItem('dbTeams');
        const teams = JSON.parse(storedTeams) || []
        const sendData = JSON.stringify({ 
            'Uuid' : uuid,
            'Teams' : teams
         });
        fetch(url, { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: sendData
        })
            .then(response => {
                localStorage.setItem('dbTeams', JSON.stringify([]));
                clearTeamScores();
            })
            .catch(error => {
                console.log(`Clear request error when contacting data management API: ${error}`);
            })
    }

    function clearTeamScores() {
        const keys = []
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key !== 'uuid' && key !== 'dbTeams') {
                keys.push(key);
            }
        }

        for (const key of keys) {
            localStorage.setItem(key, JSON.stringify([]));
        }
    }

    return(
        <div id='resetContainer'>
            <MdRefresh id='resetIcon' onClick={clear}/>
            <div id='resetTooltip' className='tooltip'>Click to reset rosters</div>
        </div>
    )
}

export default Reset;