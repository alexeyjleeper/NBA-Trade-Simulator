import React from 'react';
import TeamColors from '../storage/teamColors.json';

function RosterTable({team, roster}) {

    return(
        <div id="rosterTable">
            {roster.map(item => <div style={{backgroundColor: TeamColors[team][0],
                                             color: TeamColors[team][1]}}>{item}</div>)}
        </div>
    )
}

export default RosterTable;