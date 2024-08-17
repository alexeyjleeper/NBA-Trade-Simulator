import {React, useState, useRef, useEffect} from 'react';
import HomeNav from '../components/HomeNav.js';
import {useNavigate} from 'react-router-dom';
import {MdOutlineAdd, MdArrowRight} from 'react-icons/md';
import TradeAsset from '../components/TradeAsset.js';
import Select from 'react-select';
import TeamColors from '../storage/teamColors.json';

function TradeBuilder({homeTooltip,
                       homeNoti, 
                       showHomeTooltip, 
                       hideHomeTooltip, 
                       hideHomeNoti,
                       leftList,
                       rightList,
                       setCurrList,
                       selectTeamLeft,
                       setSelectTeamLeft,
                       selectTeamRight,
                       setSelectTeamRight,
                       showPlayerTooltip,
                       hidePlayerNoti,
                       playerTooltip,
                       playerNoti,
                       deleteAsset}) {
    const [mounted, setMounted] = useState();
    const [bannerImgLeft, setBannerImgLeft] = useState();
    const [bannerImgRight, setBannerImgRight] = useState();
    const [bannerLeftBg, setBannerLeftBg] = useState();
    const [bannerRightBg, setBannerRightBg] = useState();
    const bannerLeft = useRef(null);
    const bannerRight = useRef(null);

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
        const ref = bannerRight
        const img = new Image()
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
            color: 'white'
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
        { value: "Philadelphia Sixers", label: "Philadelphia Sixers"},
        { value: "Phoenix Suns", label: "Phoenix Suns"},
        { value: "Portland Trail Blazers", label: "Portland Trail Blazers"},
        { value: "Sacramento Kings", label: "Sacramento Kings"},
        { value: "San Antonio Spurs", label: "San Antonio Spurs"},
        { value: "Toronto Raptors", label: "Toronto Raptors"},
        { value: "Utah Jazz", label: "Utah Jazz"},
        { value: "Washington Wizards", label: "Washington Wizards"}
    ]

    async function sendTrade() {

        const url = 'http://localhost:5000/submitTrade';

        //convert lists to 1 json array
        const data = []
        for (let i of leftList) {

            //[name, destination] for each item in the array
            let item = [i, selectTeamRight]

            data.push(item)
        }
        for (let i of rightList) {
            let item = [i, selectTeamLeft]
            data.push(item)
        }

        const jsonData = JSON.stringify(data)

        //send request to tradeService
        console.log('request to tradeService');
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/Json'
            },
            body: jsonData
        })
        .then(response => response.text())
        .then(data => {

            if (data === 'success') {
                console.log('response: ', data);
                console.log('success');
            }
        })
        .catch(err => {
            console.log('Trading microservice error: ', err);
        }); 
    }
    
    return(
        <div id='tradePage'>
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
                                    onChange={createBannerLeft}/>
                        </div>
                        <ul className='offer'>
                            {leftList.map((item, i) => <TradeAsset item={item} key={i} deleteAsset={deleteAsset}/>)}
                            <li className='addPlayer'>
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
                                    onChange={createBannerRight}/>
                        </div>
                        <ul className='offer'>
                            {rightList.map((item, i) => <TradeAsset item={item} key={i} deleteAsset={deleteAsset}/>)}
                            <li className='addPlayer'>
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
            <div id='submit' onClick={sendTrade}>
                Submit
            </div>
            <HomeNav homeNoti={homeNoti} homeFunc={doubleCheck}/>
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