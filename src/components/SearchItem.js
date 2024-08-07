import React from 'react';
import {useNavigate} from 'react-router-dom';

function SearchItem({item, updateList}) {
    const navigate = useNavigate();

    const navSearch = () => {
        navigate('/trade');
    }

    function response (event) {
        updateList(event);
        navSearch();
    }
    return(
        <li onClick={response} class='searchItem'>{item}</li>
    )
}

export default SearchItem;