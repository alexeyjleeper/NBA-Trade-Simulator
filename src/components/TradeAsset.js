import React from 'react';

function TradeAsset({item, deleteAsset}) {
    return(
        <li className='asset' onClick={deleteAsset}>
            <p>
                -
            </p>
            {item}
        </li>
    )
}

export default TradeAsset;