import {React, useState} from 'react';
import HomeNav from '../components/HomeNav.js';
import {useNavigate} from 'react-router-dom';
import {MdOutlineAdd} from 'react-icons/md';
import TradeAsset from '../components/TradeAsset.js';
import Select from 'react-select';

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
    const [showDropLeft, setShowDropLeft] = useState(false);
    const changeSelectL = event => {
        setSelectTeamLeft(event.target.dataset.value);
        setShowDropLeft(false);
    }

    const [showDropRight, setShowDropRight] = useState(false);
    const changeSelectR = event => {
        setSelectTeamRight(event.target.dataset.value);
        setShowDropRight(false);
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

    const navSearchLeft = () => {
        navigate('/trade/search');

        //so my search page can add to the correct side
        setCurrList('left');
    }

    const navSearchRight = () => {
        navigate('/trade/search');
        setCurrList('right');
    }

    const teamSelectStyles = {
        option: (provided, state) => ({
            ...provided,
            color: 'black'
        }),
        control: (provided) => ({
            ...provided,
            width: '113%',
            background: 'transparent',
            border: 'none'
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'white',
            fontFamily: 'Montserrat',
            whiteSpace: 'nowrap'
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
            <div id='transact'>
                <Select options={teams} placeholder="Select a Team" styles={teamSelectStyles}/>
                <Select options={teams} placeholder="Select a Team" styles={teamSelectStyles}/>
                <ul class='offer'>
                    {leftList.map((item, i) => <TradeAsset item={item} key={i} deleteAsset={deleteAsset}/>)}
                    <li class='addPlayer' onClick={navSearchLeft}>
                        <MdOutlineAdd/>
                        Add to trade
                    </li>
                </ul>
                <ul class='offer'>
                    {rightList.map((item, i) => <TradeAsset item={item} key={i} deleteAsset={deleteAsset}/>)}
                    <li class='addPlayer' onClick={navSearchRight}>
                        <MdOutlineAdd/>
                        Add to trade
                    </li>
                </ul>

            </div>
            <div id='submit' onClick={sendTrade}>
                Submit
            </div>
            <div id = 'dropSelectLeft' onClick = {() => setShowDropLeft(true)}>
                {selectTeamLeft}
            </div>
            <span>
                {showDropLeft && (
                    <ul id='teamSelectLeft'>
                        <li onClick={changeSelectL} data-value='Boston Celtics'>Boston Celtics</li>
                        <li onClick={changeSelectL} data-value='Brooklyn Nets'>Brooklyn Nets</li>
                        <li onClick={changeSelectL} data-value='New York Knicks'>New York Knicks</li>
                        <li onClick={changeSelectL} data-value='Philadelphia 76ers'>Philadelphia 76ers</li>
                        <li onClick={changeSelectL} data-value='Toronto Raptors'>Toronto Raptors</li>
                        <li onClick={changeSelectL} data-value='Chicago Bulls'>Chicago Bulls</li>
                        <li onClick={changeSelectL} data-value='Cleveland Cavaliers'>Cleveland Cavaliers</li>
                        <li onClick={changeSelectL} data-value='Detroit Pistons'>Detroit Pistons</li>
                        <li onClick={changeSelectL} data-value='Indiana Pacers'>Indiana Pacers</li>
                        <li onClick={changeSelectL} data-value='Milwaukee Bucks'>Milwaukee Bucks</li>
                        <li onClick={changeSelectL} data-value='Atlanta Hawks'>Atlanta Hawks</li>
                        <li onClick={changeSelectL} data-value='Charlotte Hornets'>Charlotte Hornets</li>
                        <li onClick={changeSelectL} data-value='Miami Heat'>Miami Heat</li>
                        <li onClick={changeSelectL} data-value='Orlando Magic'>Orlando Magic</li>
                        <li onClick={changeSelectL} data-value='Washington Wizards'>Washington Wizards</li>
                        <li onClick={changeSelectL} data-value='Denver Nuggets'>Denver Nuggets</li>
                        <li onClick={changeSelectL} data-value='Minnesota Timberwolves'>Minnesota Timberwolves</li>
                        <li onClick={changeSelectL} data-value='Oklahoma City Thunder'>Oklahoma City Thunder</li>
                        <li onClick={changeSelectL} data-value='Portland Trail Blazers'>Portland Trail Blazers</li>
                        <li onClick={changeSelectL} data-value='Utah Jazz'>Utah Jazz</li>
                        <li onClick={changeSelectL} data-value='Golden State Warriors'>Golden State Warriors</li>
                        <li onClick={changeSelectL} data-value='Los Angeles Clippers'>Los Angeles Clippers</li>
                        <li onClick={changeSelectL} data-value='Los Angeles Lakers'>Los Angeles Lakers</li>
                        <li onClick={changeSelectL} data-value='Phoenix Suns'>Phoenix Suns</li>
                        <li onClick={changeSelectL} data-value='Dallas Mavericks'>Dallas Mavericks</li>
                        <li onClick={changeSelectL} data-value='Houston Rockets'>Houston Rockets</li>
                        <li onClick={changeSelectL} data-value='Sacramento Kings'>Sacramento Kings</li>
                        <li onClick={changeSelectL} data-value='Memphis Grizzlies'>Memphis Grizzlies</li>
                        <li onClick={changeSelectL} data-value='New Orleans Pelicans'>New Orleans Pelicans</li>
                        <li onClick={changeSelectL} data-value='San Antonio Spurs'>San Antonio Spurs</li>
                    </ul>
                )}
            </span>
            <div id = 'dropSelectRight' onClick = {() => setShowDropRight(true)}>
                {selectTeamRight}
            </div>
            <span>
                {showDropRight && (
                    <ul id='teamSelectRight'>
                        <li onClick={changeSelectR} data-value='Boston Celtics'>Boston Celtics</li>
                        <li onClick={changeSelectR} data-value='Brooklyn Nets'>Brooklyn Nets</li>
                        <li onClick={changeSelectR} data-value='New York Knicks'>New York Knicks</li>
                        <li onClick={changeSelectR} data-value='Philadelphia 76ers'>Philadelphia 76ers</li>
                        <li onClick={changeSelectR} data-value='Toronto Raptors'>Toronto Raptors</li>
                        <li onClick={changeSelectR} data-value='Chicago Bulls'>Chicago Bulls</li>
                        <li onClick={changeSelectR} data-value='Cleveland Cavaliers'>Cleveland Cavaliers</li>
                        <li onClick={changeSelectR} data-value='Detroit Pistons'>Detroit Pistons</li>
                        <li onClick={changeSelectR} data-value='Indiana Pacers'>Indiana Pacers</li>
                        <li onClick={changeSelectR} data-value='Milwaukee Bucks'>Milwaukee Bucks</li>
                        <li onClick={changeSelectR} data-value='Atlanta Hawks'>Atlanta Hawks</li>
                        <li onClick={changeSelectR} data-value='Charlotte Hornets'>Charlotte Hornets</li>
                        <li onClick={changeSelectR} data-value='Miami Heat'>Miami Heat</li>
                        <li onClick={changeSelectR} data-value='Orlando Magic'>Orlando Magic</li>
                        <li onClick={changeSelectR} data-value='Washington Wizards'>Washington Wizards</li>
                        <li onClick={changeSelectR} data-value='Denver Nuggets'>Denver Nuggets</li>
                        <li onClick={changeSelectR} data-value='Minnesota Timberwolves'>Minnesota Timberwolves</li>
                        <li onClick={changeSelectR} data-value='Oklahoma City Thunder'>Oklahoma City Thunder</li>
                        <li onClick={changeSelectR} data-value='Portland Trail Blazers'>Portland Trail Blazers</li>
                        <li onClick={changeSelectR} data-value='Utah Jazz'>Utah Jazz</li>
                        <li onClick={changeSelectR} data-value='Golden State Warriors'>Golden State Warriors</li>
                        <li onClick={changeSelectR} data-value='Los Angeles Clippers'>Los Angeles Clippers</li>
                        <li onClick={changeSelectR} data-value='Los Angeles Lakers'>Los Angeles Lakers</li>
                        <li onClick={changeSelectR} data-value='Phoenix Suns'>Phoenix Suns</li>
                        <li onClick={changeSelectR} data-value='Dallas Mavericks'>Dallas Mavericks</li>
                        <li onClick={changeSelectR} data-value='Houston Rockets'>Houston Rockets</li>
                        <li onClick={changeSelectR} data-value='Sacramento Kings'>Sacramento Kings</li>
                        <li onClick={changeSelectR} data-value='Memphis Grizzlies'>Memphis Grizzlies</li>
                        <li onClick={changeSelectR} data-value='New Orleans Pelicans'>New Orleans Pelicans</li>
                        <li onClick={changeSelectR} data-value='San Antonio Spurs'>San Antonio Spurs</li>
                    </ul>
                )}
            </span>
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