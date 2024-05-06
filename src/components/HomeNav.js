import React from 'react';
import {MdHome, MdRadioButtonChecked} from 'react-icons/md';

function HomeNav({homeTooltip, 
                  homeNoti, 
                  showHomeTooltip, 
                  hideHomeTooltip, 
                  homeFunc}){
    return(
        <div id = 'homeNav'>
            <MdHome id = 'homeIcon'
                onMouseEnter={showHomeTooltip} 
                onMouseLeave={hideHomeTooltip}
                onClick={homeFunc}/>
            {homeNoti && (<MdRadioButtonChecked id = 'homeNoti'/>)}
            {homeTooltip && (
                <div className='tooltip' id = 'homeTooltip'>
                    Click this button on other pages 
                    to navigate back to the homepage.
                </div>
            )}
        </div>
    )
}

export default HomeNav;