import { React, useState, useRef, useEffect } from 'react';
import HomeNav from '../components/HomeNav.js';
import AssetSelect from '../components/AssetSelect.js';
import TradeContent from '../components/TradeContent.js';

function TradeBuilder({uuid}) {
    const [topAssets, setTopAssets] = useState([[],[]]);
    const [bottomAssets, setBottomAssets] = useState([[],[]]);
    const [selectTop, setSelectTop] = useState();
    const [selectBottom, setSelectBottom] = useState();
    const [topList, setTopList] = useState([]);
    const [bottomList, setBottomList] = useState([]);
    const [currList, setCurrList] = useState();
    const [bgSize, setBgSize] = useState('cover');
    const [topLoaded, setTopLoaded] = useState(false);
    const [botLoaded, setBotLoaded] = useState(false);
    const assetSelect = useRef(null);
    const addTop = useRef(null);
    const addBot = useRef(null);

    // update top team data when a team is selected
    useEffect(() => {
        getAssets(selectTop);
    }, [selectTop])

    // update bottom team data when a team is selected
    useEffect(() => {
        getAssets(selectBottom);
    }, [selectBottom]);

    
    // handle availability of top "add player button"
    useEffect(() => {
        if (topLoaded) {
            if (addTop.current) {
                addTop.current.style.pointerEvents = 'auto';
                addTop.current.style.opacity = '1';
            }
        } else {
            if (addTop.current) {
                addTop.current.style.pointerEvents = 'none';
                addTop.current.style.opacity = '0';
            }
        }
    }, [topLoaded]);

    // handle availability of bottom "add player button"
    useEffect(() => {
        if (botLoaded) {
            if (addBot.current) {
                addBot.current.style.pointerEvents = 'auto';
                addBot.current.style.color = 'white';
                addBot.current.style.opacity = '1';
            }
        } else {
            if (addBot.current) {
                addBot.current.style.pointerEvents = 'none';
                addBot.current.style.color = '#383838';
                addBot.current.style.opacity = '0';
            }
        }
    }, [botLoaded]);

    function updateArray(array, removeArray, addArray) {
        for (const item of removeArray) {
            //remove first occurrence of item, handle duplicates
            const index = array.indexOf(item);
            array.splice(index, 1);
        }

        for (const item of addArray) {
            array.push(item);
        }
    }

    function modifyAssets(){
        // update rosters
        const newTopRoster = topAssets[0];
        const newBottomRoster = bottomAssets[0];
        const topListPlayers = topList.filter(item => item[0] !== "2");
        const bottomListPlayers = bottomList.filter(item => item[0] !== "2");
        updateArray(newTopRoster, topListPlayers, bottomListPlayers);
        updateArray(newBottomRoster, bottomListPlayers, topListPlayers);

        // update picks
        const newTopPicks = topAssets[1];
        const newBottomPicks = bottomAssets[1];
        const topPicks = topList.filter(item => item[0] === "2");
        const bottomPicks = bottomList.filter(item => item[0] === "2");
        updateArray(newTopPicks, topPicks, bottomPicks);
        updateArray(newBottomPicks, bottomPicks, topPicks);

        return [newTopRoster, newBottomRoster, newTopPicks, newBottomPicks]
    }

    function updateDbList() {
        const teams = localStorage.getItem('dbTeams');
        const newTeams = JSON.parse(teams) || [];
        if (!newTeams.includes(selectTop)) {
            newTeams.push(selectTop);
        }
        if (!newTeams.includes(selectBottom)) {
            newTeams.push(selectBottom);
        }
        const toString = JSON.stringify(newTeams);
        localStorage.setItem('dbTeams', toString);
    }


    function sendTrade() {
        // initial error handling
        if (!(selectTop && selectBottom)) {
            console.log("Teams not selected");
            return
        }
        if (selectTop === selectBottom) {
            console.log("Please select different teams");
        }
        if (!(topList && bottomList)) {
            console.log("Missing assets");
            return
        }

        //format body values
        const [newTopRoster, newBottomRoster, newTopPicks, newBottomPicks] = modifyAssets();

        const putData = {
            "Uuid" : uuid,
            "TradeTeams" : [selectTop, selectBottom],
            "NewRosters" : [newTopRoster, newBottomRoster],
            "Picks" : [newTopPicks, newBottomPicks]
        }
        const sendData = JSON.stringify(putData);

        const url = "http://localhost:4000/"
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: sendData
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log("put return");
                console.log(data);

                // update list of store teams in local storage
                updateDbList();

                // clear trade lists
                setTopList([]);
                setBottomList([]);

                // update assetSeleect
                getAssets(selectTop);
                getAssets(selectBottom);
            })
            .catch(error => {
                console.log(`error fetching from data management API: ${error}`);
            })
    
    }    
    
    // store updated score and updated list of players in localstorage
    function updateLocalTeamData(team, score, players) {
        const teamData = localStorage.getItem(team);
        const dataArray = JSON.parse(teamData) || [];
        if (dataArray.length === 0) {
            localStorage.setItem(team, JSON.stringify([[score], players]));
        } else {
            dataArray[0][1] = score;
            dataArray[1] = players;
            localStorage.setItem(team, JSON.stringify(dataArray));
        }
    }

    // check if the provided team is stored in db
    function isStored (team) {
        const teams = localStorage.getItem('dbTeams');
        const newTeams = JSON.parse(teams) || [];
        if (newTeams.includes(team)) {
            return true;
        }
        return false;
    }    

    function getAssets(team) {
        //reset the "add player" button's availability
        if (team == selectTop) {
            setTopLoaded(false);
            console.log('reset add top button');
        } else {
            setBotLoaded(false);
        }

        if (team == null) {
            return
        }
        const teamToURL = team.replace(/ /g, '+');
        const stored = isStored(team);
        const url = `http://localhost:4000/?uuid=${uuid}&team=${teamToURL}&db=${stored}`;
        fetch(url, { method: 'GET'})
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (team == selectTop) {

                    // for asset select to get the correct data
                    setCurrList('top');

                    setTopAssets([data.Players, data.Picks]);

                    //set loaded to true, to allow "add players" button to become availabe
                    setTopLoaded(true);

                } else if (team == selectBottom) {

                    // for asset select to get the correct data
                    setCurrList('bottom');

                    setBottomAssets([data.Players, data.Picks]);

                    // set loaded to true, to allow "add players" button to become availabe
                    setBotLoaded(true);
                }
                updateLocalTeamData(team, data.Score, data.Players);
            })
            .catch(err => {
                console.log('Error: ', err);
            });
    }

    function showAssetSelect(list) {
        setCurrList(list);
        if (assetSelect.current) {
            assetSelect.current.style.pointerEvents = 'auto';
            assetSelect.current.style.opacity = '1';
        }
    }


    function addToAssetList(selectedOption) {
        if (currList == "top") {
            setTopList(prev => [...prev, selectedOption.label]);
        } else {
            setBottomList(prev => [...prev, selectedOption.label]);
        }
        if (assetSelect.current) {
            assetSelect.current.style.pointerEvents = "none";
            assetSelect.current.style.opacity = "0";
        }
    }
    
    return(
        <div id='tradePage' style={{backgroundSize: bgSize}}>
            <div className='navButtons'>
                <HomeNav/>
            </div>
            <AssetSelect topAssets={topAssets}
                         bottomAssets={bottomAssets}
                         currList={currList}
                         addToList={addToAssetList}
                         ref={assetSelect}/>
            <div id='tradeHeader'>
            </div>
            <TradeContent setSelectTop={setSelectTop}
                          setSelectBottom={setSelectBottom}
                          topList={topList}
                          bottomList={bottomList}
                          setTopList={setTopList}
                          setBottomList={setBottomList}
                          showAssetSelect={showAssetSelect}
                          addTop={addTop}
                          addBot={addBot}/>
            <button id='submit' onClick={sendTrade}>
                Submit
            </button>
        </div>
    )
}

export default TradeBuilder;