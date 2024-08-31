import {useRef} from 'react';
import TeamColors from '../storage/teamColors.json';

function ScoreDisplay ({team, initial, current, type}) {
    const diffRef = useRef(null);

    // style difference next to score number
    const difference = current - initial;
    let diffValue = "\u00A0";
    if (difference > 0) {
        diffValue += "(+" + `${difference})`;
        if (diffRef.current) {
            diffRef.current.style.color = 'green';
            diffRef.current.style.opacity = '1';
        }
    } else if (difference < 0) {
        diffValue += "(" + `${difference})`;
        if (diffRef.current) {
            diffRef.current.style.color = 'red';
            diffRef.current.style.opacity = '1';
        }
    } else {
        diffValue = "";
        if (diffRef.current) {
            diffRef.current.style.opacity = '0';
        }
    }

    // change color of progress bar
    let barColor = 'transparent';
    if (team !== "Select a team") {
        barColor = TeamColors[team][0];
    }

    return(
        <div className="scoreDisplay">
            <h1 className='scoreType'>
                {type}
            </h1>
            <div className="barContainer">
                <div className="progressBar" style={{height: `${current}%`, backgroundColor: barColor}}>
                </div>
            </div>
            <div className="score">
                    <h1>{current}</h1>
                    <h1 ref={diffRef}>{diffValue}</h1>
            </div>
        </div>
    )
}
export default ScoreDisplay;