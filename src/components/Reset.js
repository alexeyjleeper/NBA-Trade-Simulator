import {React} from 'react';
import {MdRefresh} from 'react-icons/md';

function Reset() {
    
    //function to reset storage of microservices
    async function reset() {

        //call reset on storage manager service
        let url = 'http://localhost:8080/reset';

        fetch(url, {method: 'GET'})
            .then(response => response.text())
            .then(data => {
                if (data === 'success'){
                    console.log('reset successful');
                }
            })
            .catch(err => {
                console.log('Error reseting playerSearch: ', err)
            });
    }

    return(
        <div id='resetContainer'>
            <MdRefresh id='resetIcon' onClick={reset}/>
            <div id='resetTooltip' class='tooltip'>Click to reset rosters</div>
        </div>
    )
}

export default Reset;