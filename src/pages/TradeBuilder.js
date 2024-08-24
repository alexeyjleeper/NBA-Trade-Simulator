import { v4 } from 'uuid';
import { React, useState, useRef, useEffect } from 'react';
import HomeNav from '../components/HomeNav.js';
import { useNavigate } from 'react-router-dom';
import { MdOutlineAdd, MdArrowRight } from 'react-icons/md';
import TradeAsset from '../components/TradeAsset.js';
import Select from 'react-select';
import TeamColors from '../storage/teamColors.json';
import AssetSelect from '../components/AssetSelect.js';

function TradeBuilder({storedTeams}) {
    const [mounted, setMounted] = useState();
    const [bannerImgLeft, setBannerImgLeft] = useState();
    const [bannerImgRight, setBannerImgRight] = useState();
    const [bannerLeftBg, setBannerLeftBg] = useState();
    const [bannerRightBg, setBannerRightBg] = useState();
    const [topList, setTopList] = useState(["Lebron James", "Anthony Davis"]);
    const [bottomList, setBottomList] = useState(["Deni Avdija", "Deandre Ayton", "2025 1st Round Pick", "2025 2nd Round Pick"]);
    const [topAssets, setTopAssets] = useState([[],[]]);
    const [bottomAssets, setBottomAssets] = useState([[],[]]);
    const [selectLeft, setSelectLeft] = useState();
    const [selectRight, setSelectRight] = useState();
    const [currList, setCurrList] = useState();
    const [bgSize, setBgSize] = useState('cover');
    const bannerLeft = useRef(null);
    const bannerRight = useRef(null);
    const assetSelect = useRef(null);

    function sendTrade() {
        // need to organize data for the put request
        // need to upadte local variable for the 
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
        const removePlayer = event.currentTarget.parentNode.textContent;

        const top = topList;
        const bottom = bottomList;

        if (top.includes(`${removePlayer}`)) {
            const newList = [];
            for (let i in top) {
                if (i !== removePlayer) {
                    newList.push(i);
                }
            }
            setTopList(newList)
        } else if (bottom.includes(`${removePlayer}`)) {
            const newList = [];
            for (let i in bottom) {
                if (i !== removePlayer) {
                    newList.push(i);
                }
            }
            setBottomList(newList);
        }
    }

    function getAssets(team) {
        if (team == null) {
            console.log('no team selected');
            return
        }
        const uuid = getUUID();
        const teamToURL = team.replace(/ /g, '+');
        const stored = isStored(team);
        const url = `http://localhost:4000/search?uuid=${uuid}&team=${teamToURL}&db=${stored}`;
        let res = 0;
        fetch(url, { method: 'GET'})
            .then(response => {
                return response.json();
            })
            .then(data => {
                res = data;
                if (team == selectLeft) {
                    setCurrList('top');
                    setTopAssets([[res.Players],[res.Picks]]);
                    console.log(`players data: ${res.Players}`);
                    console.log(`top state var: ${topAssets[0]}`);
                } else if (team == selectRight) {
                    setCurrList('bottom');
                    setBottomAssets([[res.Players], [res.Picks]]);
                }

                // bring up asset select component
                if (assetSelect.current) {
                    assetSelect.current.style.pointerEvents = 'auto';
                    assetSelect.current.style.opacity = '1';
                }

            })
            .catch(err => {
                console.log('Error: ', err);
            });
    }

    const isStored = (team) => {
        return storedTeams.has(team);
    }

    const getUUID = () => {
        const uuid = localStorage.getItem('uuid')
        if (uuid) {
            return uuid;
        } else {
            const newUUID = v4();
            localStorage.setItem('uuid', newUUID);
            return newUUID;
        }
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
                            <li className='addPlayer' onClick={() => getAssets(selectLeft)}>
                                <MdOutlineAdd/>
                                Add to trade
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
                            <li className='addPlayer' onClick={() => getAssets(selectRight)}>
                                <MdOutlineAdd/>
                                Add to trade
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
            <div id='submit'>
                Submit
            </div>
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