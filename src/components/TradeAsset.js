import React from 'react';
import {MdCancel} from 'react-icons/md';

function TradeAsset({item, key, deleteAsset}) {
    return(
        <li class='asset'>{item}<MdCancel class='delete' onClick={deleteAsset}/> </li>
    )
}

export default TradeAsset;