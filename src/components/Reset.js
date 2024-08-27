import {React} from 'react';
import {MdRefresh} from 'react-icons/md';

function Reset({uuid}) {
    
    //function to reset storage of microservices
    function clear() {
        const url = 'http://localhost:4000/';
        const storedTeams = localStorage.getItem('dbTeams');
        const teams = JSON.parse(storedTeams) || []
        const sendData = JSON.stringify({ 
            "Uuid" : uuid,
            "Teams" : teams
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
                console.log(`successfully cleared data for user: ${uuid}`);
            })
            .catch(error => {
                console.log(`Clear request error when contacting data management API: ${error}`);
            })
    }

    return(
        <div id='resetContainer'>
            <MdRefresh id='resetIcon' onClick={clear}/>
            <div id='resetTooltip' class='tooltip'>Click to reset rosters</div>
        </div>
    )
}

export default Reset;