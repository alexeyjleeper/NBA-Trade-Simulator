import React from 'react';

function TableRow({item, key, right}) {    
    return(
        <tr>
            <td>{item}</td>
            <td>{right}</td>
        </tr>
    )
}

export default TableRow;