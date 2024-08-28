import { React, useState, useRef, useEffect } from 'react';
import HomeNav from '../components/HomeNav.js';
import { useNavigate } from 'react-router-dom';
import { MdOutlineAdd, MdArrowRight } from 'react-icons/md';
import TradeAsset from '../components/TradeAsset.js';
import Select from 'react-select';
import TeamColors from '../storage/teamColors.json';
import AssetSelect from '../components/AssetSelect.js';

function TradeBuilder({uuid}) {
    const [mounted, setMounted] = useState();
    const [bannerImgLeft, setBannerImgLeft] = useState();
    const [bannerImgRight, setBannerImgRight] = useState();
    const [bannerLeftBg, setBannerLeftBg] = useState();
    const [bannerRightBg, setBannerRightBg] = useState();
    const [topList, setTopList] = useState([]);
    const [bottomList, setBottomList] = useState([]);
    const [topAssets, setTopAssets] = useState([[],[]]);
    const [bottomAssets, setBottomAssets] = useState([[],[]]);
    const [selectLeft, setSelectLeft] = useState();
    const [selectRight, setSelectRight] = useState();
    const [currList, setCurrList] = useState();
    const [bgSize, setBgSize] = useState('cover');
    const [topLoaded, setTopLoaded] = useState(false);
    const [botLoaded, setBotLoaded] = useState(false);
    const bannerLeft = useRef(null);
    const bannerRight = useRef(null);
    const assetSelect = useRef(null);
    const addTop = useRef(null);
    const addBot = useRef(null);

    function sendTrade() {
        // initial error handling
        if (!(selectLeft && selectRight)) {
            console.log("Teams not selected");
            return
        }
        if (selectLeft === selectRight) {
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
            "TradeTeams" : [selectLeft, selectRight],
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
                updateDbList();
                setTopList([]);
                setBottomList([]);



                // update assetSeleect
                getAssets(selectLeft);
                getAssets(selectRight);

                
            })
            .catch(error => {
                console.log(`error fetching from data management API: ${error}`);
            })
        

    }

    function updateScoreArrays(data) {

    }

    function updateDbList() {
        const teams = localStorage.getItem('dbTeams');
        const newTeams = JSON.parse(teams) || [];
        if (!newTeams.includes(selectLeft)) {
            newTeams.push(selectLeft);
        }
        if (!newTeams.includes(selectRight)) {
            newTeams.push(selectRight);
        }
        const toString = JSON.stringify(newTeams);
        localStorage.setItem('dbTeams', toString);
    }

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

    useEffect(() => {
        const handleResize = () => {
            setBgSize('auto');
        };

        window.addEventListener('resize', handleResize);
      
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

    function deleteAsset(event) {
    
        //get player
        const content = event.currentTarget.textContent;
        console.log('yart');
        const removePlayer = content.slice(1);
        console.log(removePlayer)

        const top = topList;
        const bottom = bottomList;

        if (top.includes(`${removePlayer}`)) {
            const newList = top.filter(item => item !== removePlayer);
            setTopList(newList);
        } else if (bottom.includes(`${removePlayer}`)) {
            const newList = bottom.filter(item => item !== removePlayer);
            setBottomList(newList);
        }
    }

    useEffect(() => {
        getAssets(selectLeft);
    }, [selectLeft])

    useEffect(() => {
        getAssets(selectRight);
    }, [selectRight]);

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

    function getAssets(team) {
        //reset the "add player" button's availability
        if (team == selectLeft) {
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
        let res = 0;
        fetch(url, { method: 'GET'})
            .then(response => {
                return response.json();
            })
            .then(data => {
                res = data;
                if (team == selectLeft) {
                    setCurrList('top');
                    setTopAssets([res.Players, res.Picks]);
                    setTopLoaded(true);
                } else if (team == selectRight) {
                    setCurrList('bottom');
                    setBottomAssets([res.Players, res.Picks]);
                    setBotLoaded(true);
                }
                updateLocalScore(team, res.Score);

            })
            .catch(err => {
                console.log('Error: ', err);
            });
    }

    function updateLocalScore(team, score) {
        const teamScore = localStorage.getItem(team);
        const scoreArray = JSON.parse(teamScore) || [];
        if (scoreArray.length === 0) {
            localStorage.setItem(team, JSON.stringify([score]));
        } else {
            console.dir(score);
            scoreArray[1] = score;
            localStorage.setItem(team, JSON.stringify(scoreArray));
        }
    }

    function showAssetSelect(list) {
        setCurrList(list);
        if (assetSelect.current) {
            assetSelect.current.style.pointerEvents = 'auto';
            assetSelect.current.style.opacity = '1';
        }
    }

    const isStored = (team) => {
        const teams = localStorage.getItem('dbTeams');
        const newTeams = JSON.parse(teams) || [];
        if (newTeams.includes(team)) {
            return true;
        }
        return false;
    }

    function handleSelectTop (option) {
        createBannerLeft(option);
        setSelectLeft(option.label);
        setTopList([]);
    }

    function handleSelectBot (option) {
        createBannerRight(option);
        setSelectRight(option.label);
        setBottomList([]);
    }

    const createBannerLeft = (option) => {
        setBannerColor(setBannerLeftBg, option.label);
        setBannerImage(option.label, setBannerImgLeft);
    }
    
    const createBannerRight = (option) => {
        setBannerColor(setBannerRightBg, option.label);
        setBannerImage(option.label, setBannerImgRight);
    }

    const setBannerImage = (team, setStateVar) => {
        const logoQueryTeam = team.replace(/ /g, '_');
        
        let url = 'http://localhost:8000/' + logoQueryTeam;

        //request for team logo
        console.log('request to imgMicroservice');
        fetch(url, {method: 'GET'})
            .then(response => {
                return response.text();
            })
            .then(data => {

                //get image from the url
                fetch(`${data}`, {method: 'GET'})
                    .then(response => {
                        console.log('reponse: ', response);
                        return response.blob();
                    })
                    .then(blob => {
                        const image = URL.createObjectURL(blob);
                        setStateVar(image);
                    })
                    .catch(error => {
                        // Handle errors
                        console.log('Error:', error);
                    });
            })
            .catch(error => {
                // Handle errors
                console.log('Error:', error);
            });
    }

    useEffect(() => {
        const ref = bannerLeft;
        const img = new Image()
        img.src = bannerImgLeft;
        img.onload = () => {
            ref.current.style.backgroundColor = bannerLeftBg;
        }
        if (mounted && ref.current.style.opacity == 0) {
            ref.current.style.opacity = "1";
        }
        return () => {
            img.onload = null;
        }
    }, [bannerImgLeft]);

    useEffect(() => {
        const ref = bannerRight;
        const img = new Image();
        img.src = bannerImgRight;
        img.onload = () => {
            ref.current.style.backgroundColor = bannerRightBg;
        }
        if (mounted && ref.current.style.opacity == 0) {
            ref.current.style.opacity = "1";
        }
        return () => {
            img.onload = null;
        }
    }, [bannerImgRight]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const setBannerColor = (setColor, team) => {
        const color = TeamColors[team];
        setColor(color);
    }
    
    const [saveCheck, setSaveCheck] = useState(false);
    const doubleCheck = () => {
        setSaveCheck(true);
    }
    const hideDouble = () => {
        setSaveCheck(false);
    }
    
    const navigate = useNavigate();

    const navHome = () => {
        navigate('/');
    }

    const teamSelectStyles = {
        singleValue: (provided) => ({
            ...provided,
            color: 'white'
        }),
        option: (provided) => ({
            ...provided,
            color: 'black'
        }),
        control: (provided, state) => ({
            ...provided,
            width: '113%',
            background: 'transparent',
            color: 'white',
            boxShadow: 'none',
            borderColor: state.isFocused ? 'transparent' : 'transparent',
            cursor: 'pointer',
            '&:hover': {
                borderColor: 'transparent',
                cursor: 'select'
            }
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            display: 'none'
          }),   
        input: (provided) => ({
            ...provided,
            caretColor: 'transparent'
        }),          
        placeholder: (provided) => ({
            ...provided,
            color: 'white',
            fontFamily: 'Montserrat',
            whiteSpace: 'nowrap',
            fontWeight: '450'
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none'
        })
    }

    const teams = [
        { value: "Atlanta Hawks", label: "Atlanta Hawks"},
        { value: "Boston Celtics", label: "Boston Celtics"},
        { value: "Brooklyn Nets", label: "Brooklyn Nets"},
        { value: "Charlotte Hornets", label: "Charlotte Hornets"},
        { value: "Chicago Bulls", label: "Chicago Bulls"},
        { value: "Cleveland Cavaliers", label: "Cleveland Cavaliers"},
        { value: "Dallas Mavericks", label: "Dallas Mavericks"},
        { value: "Denver Nuggets", label: "Denver Nuggets"},
        { value: "Detroit Pistons", label: "Detroit Pistons"},
        { value: "Golden State Warriors", label: "Golden State Warriors"},
        { value: "Houston Rockets", label: "Houston Rockets"},
        { value: "Indiana Pacers", label: "Indiana Pacers"},
        { value: "Los Angeles Clippers", label: "Los Angeles Clippers"},
        { value: "Los Angeles Lakers", label: "Los Angeles Lakers"},
        { value: "Memphis Grizzlies", label: "Memphis Grizzlies"},
        { value: "Miami Heat", label: "Miami Heat"},
        { value: "Milwaukee Bucks", label: "Milwaukee Bucks"},
        { value: "Minnesota Timberwolves", label: "Minnesota Timberwolves"},
        { value: "New Orleans Pelicans", label: "New Orleans Pelicans"},
        { value: "New York Knicks", label: "New York Knicks"},
        { value: "Oklahoma City Thunder", label: "Oklahoma City Thunder"},
        { value: "Orlando Magic", label: "Orlando Magic"},
        { value: "Philadelphia 76ers", label: "Philadelphia 76ers"},
        { value: "Phoenix Suns", label: "Phoenix Suns"},
        { value: "Portland Trail Blazers", label: "Portland Trail Blazers"},
        { value: "Sacramento Kings", label: "Sacramento Kings"},
        { value: "San Antonio Spurs", label: "San Antonio Spurs"},
        { value: "Toronto Raptors", label: "Toronto Raptors"},
        { value: "Utah Jazz", label: "Utah Jazz"},
        { value: "Washington Wizards", label: "Washington Wizards"}
    ]
    
    return(
        <div id='tradePage' style={{backgroundSize: bgSize}}>
            <AssetSelect topAssets={topAssets}
                         bottomAssets={bottomAssets}
                         currList={currList}
                         addToList={addToAssetList}
                         ref={assetSelect}/>
            <div id='header'>
            </div>
            <div id="tradeContent">
                <div id='transact'>
                    <div className='transactHalf'>
                        <div className="transactHalfHeader">
                            <MdArrowRight className="headerArrow"/>
                            <Select className='select' 
                                    options={teams} 
                                    placeholder="Select a Team" 
                                    styles={teamSelectStyles}
                                    onChange={handleSelectTop}/>
                        </div>
                        <ul className='offer'>
                            {topList.map((item, i) => <TradeAsset item={item} key={i} deleteAsset={deleteAsset}/>)}
                            <li className='addPlayer' ref={addTop} onClick={() => showAssetSelect("top")}>
                                <MdOutlineAdd/>
                                Add To Trade
                            </li>
                        </ul>
                    </div>
                    <div className='transactHalf'>
                        <div className="transactHalfHeader">
                            <MdArrowRight className="headerArrow"/>
                            <Select className='select' 
                                    options={teams} 
                                    placeholder="Select a Team" 
                                    styles={teamSelectStyles}
                                    onChange={handleSelectBot}/>
                        </div>
                        <ul className='offer'>
                            {bottomList.map((item, i) => <TradeAsset item={item} key={i} deleteAsset={deleteAsset}/>)}
                            <li className='addPlayer' ref={addBot} onClick={() => showAssetSelect("bottom")}>
                                <MdOutlineAdd/>
                                Add To Trade
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="banner" 
                     ref={bannerLeft} 
                     style={{display: 'block'}}
                     id="bannerLeft">
                    <img src={bannerImgLeft} alt="upper team logo"/>
                </div>
                <div class="banner" 
                     ref={bannerRight} 
                     style={{display: 'block'}}>
                    <img src={bannerImgRight} alt="lower team logo"/>
                </div>
            </div>
            <button id='submit' onClick={sendTrade}>
                Submit
            </button>
            <HomeNav homeFunc={doubleCheck}/>
            {saveCheck && (
                <div id='doubleCheck'>
                    <div id='doubleCheckMsg'>
                        Are you sure you want to return 
                        to home? Any unsubmitted trades 
                        will lose all progress.
                    </div>
                    <div id='tradeNavCancel' onClick={hideDouble}>
                        Cancel
                    </div>
                    <div id='tradeNavHome' onClick={navHome}>
                        Home
                    </div>
                </div>
            )}
        </div>
    )
}

export default TradeBuilder;