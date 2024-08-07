import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {MdWest, MdOutlineSearch} from 'react-icons/md';
import SearchResults from '../components/searchResults.js';

function PlayerSearch({updateList}) {
    const [searchList, setSearchList] = useState([]);

    const navigate = useNavigate();

    const navBack = () => {
        navigate('/trade');
    }

    async function sendSearch(event) {
        let url = 'http://localhost:4000/search/';
        url += event.target.value;

        //send with current player name query
        console.log('request to playerSearch');
        fetch(url, {method: 'GET'})
            .then(response => {
                console.log('response: ', response);
                return response.json();
            })
            .then(data => setSearchList(data))
            .catch(err => {
                console.log('playerSearch microservice error: ', err)
            });
    }

    //update the page whenever the search
    //results list gets returned
    useEffect(() => {}, [searchList]);

    return(
        <div id='playerSearchPage'>
            <div id='backNav'>
                <MdWest id='backButton' onClick={navBack}/>
            </div>
            <MdOutlineSearch id='searchIcon'/>
            <input id='searchBar'
                   type='text' 
                   placeholder='Click to search'
                   onChange={sendSearch}/>
            <SearchResults searchList={searchList} updateList={updateList}/>
        </div>
    )
}

export default PlayerSearch;