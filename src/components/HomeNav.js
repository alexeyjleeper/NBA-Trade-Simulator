import React from 'react';
import {MdHome} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function HomeNav(){
    const nav = useNavigate();

    const navHome = () => {
        nav('/');
    }

    return(
        <div id = 'homeNav'>
            <MdHome id = 'homeIcon' onClick={navHome}/>
            <div className='tooltip' id = 'homeTooltip'>
                Click this button to navigate
                back to the homepage.
            </div>
        </div>
    )
}

export default HomeNav;