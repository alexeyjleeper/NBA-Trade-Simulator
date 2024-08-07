import React from 'react';
import SearchItem from './SearchItem.js';

function SearchResults({searchList, updateList}) {
    const list = searchList;
    return(
        <ul id='searchList'>
            {list.map((item, i) => <SearchItem item={item} updateList={updateList}/>)}
        </ul>
    )
}

export default SearchResults;