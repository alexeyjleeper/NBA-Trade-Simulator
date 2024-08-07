import React from 'react';
import TableRow from './TableRow';

function RosterTable({roster}) {
    const len = roster.length;

    //roster is a 1d array of strings

    const leftCol = [];
    const rightCol = [];
    for (let i in roster){
        if (i % 2 === 0) {
            leftCol.push(roster[i]);
        } else {
            rightCol.push(roster[i]);
        }
    }

    function tableBuilder(item, i){
        if (i === 0) {
            return(
                <tr>
                    <th class='firstRow'>{leftCol[0]}</th>
                    <th class='firstRow'>{rightCol[0]}</th>
                </tr>
            )
        //full row
        } else if (i < Math.ceil(len, 2) - 1) {
            return(
                <TableRow item={item} key={i} right={rightCol[i]}/>
            )

        //odd ending row
        } else if (i === len - 1 && i % 2 === 0) {
            return(
                <tr>
                    <td>leftCol[i]</td>
                    <td></td>
                </tr>
            )
        }
    }

    return(
        <table id='rosterTable'>
            {leftCol.map((item, i) => tableBuilder(item, i))}
        </table>
    )
}

export default RosterTable;