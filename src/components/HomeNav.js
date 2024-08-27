import React from 'react';
import {MdHome} from 'react-icons/md';

function HomeNav({homeFunc}){
    return(
        <div id = 'homeNav'>
            <MdHome id = 'homeIcon' onClick={homeFunc}/>
            <div className='tooltip' id = 'homeTooltip'>
                Click this button on other pages 
                to navigate back to the homepage.
            </div>
        </div>
    )
}

export default HomeNav;