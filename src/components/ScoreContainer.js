import React from 'react';
import ScoreDisplay from './ScoreDisplay.js';

function ScoreContainer ({team, scoreArrays}) {
    console.dir(scoreArrays);

    let current = [];
    let initial = [];
    if (scoreArrays) {
        initial = scoreArrays[0];
        if (scoreArrays.length === 1) {
            current = scoreArrays[0];
        } else {
            current = scoreArrays[1];
        }
    }
    const types = ['Interior Scoring', 'Perimeter Scoring', 'Athleticism', 'Playmaking', 'Rebounding', 'Defense'];

    const combinedScores = current.map((item, index) => [item, initial[index], types[index]]);
    console.log('combined: ' + combinedScores);

    return (
        <div id='scoresContainer'>
            {combinedScores.map(item => <ScoreDisplay team={team} initial={item[1]} current={item[0]} type={item[2]}/>)}  
        </div>
    )
}

export default ScoreContainer;