import {useState, useRef, useEffect, forwardRef} from 'react';
import TeamColors from '../storage/teamColors.json';
import TradeAsset from '../components/TradeAsset.js';
import { MdOutlineAdd, MdArrowRight } from 'react-icons/md';
import Select from 'react-select';
import Teams from '../storage/Teams.js';

const teamSelectStyles = {
    singleValue: (provided) => ({
        ...provided,
        color: 'white'
    }),
    option: (provided) => ({
        ...provided,
        color: 'black',
        backgroundColor: 'white',
        cursor: 'pointer'
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
            cursor: 'select',
            filter: 'brightness(70%)'
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
    }),
    menuList: (provided) => ({
        ...provided,
        overflowX: 'hidden'
    })
};

const TradeContent = forwardRef(({setSelectTop, 
                                 setSelectBottom,
                                 topList,
                                 bottomList,
                                 setTopList,
                                 setBottomList,
                                 showAssetSelect},
                                 addTop,
                                 addBot) => {
    const [mounted, setMounted] = useState();
    const [bannerLeftBg, setBannerLeftBg] = useState();
    const [bannerRightBg, setBannerRightBg] = useState();
    const [bannerImgLeft, setBannerImgLeft] = useState();
    const [bannerImgRight, setBannerImgRight] = useState();
    const bannerLeft = useRef(null);
    const bannerRight = useRef(null);

    // set select state var and handle banner generation

    function handleSelectTop (option) {
        createBannerLeft(option.label);
        setSelectTop(option.label);
        setTopList([]);
    }

    function handleSelectBot (option) {
        createBannerRight(option.label);
        setSelectBottom(option.label);
        setBottomList([]);
    }

    // start of banner generation

    function createBannerLeft (team) {
        setBannerColor(setBannerLeftBg, team);
        setBannerImage(team, setBannerImgLeft);
    }
    
    function createBannerRight (team) {
        setBannerColor(setBannerRightBg, team);
        setBannerImage(team, setBannerImgRight);
    }
    
    function setBannerColor (setColor, team) {
        const color = TeamColors[team][0];
        setColor(color);
    }

    function setBannerImage (team, setStateVar) {
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
        const img = new Image();
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

    // end of banner generation

    function deleteAsset(event) {
    
        //get player
        const content = event.currentTarget.textContent;

        //format string
        const removePlayer = content.slice(1);

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

    return (
        <div id="tradeContent">
            <div id='transact'>
                <div className='transactHalf'>
                    <div className="transactHalfHeader">
                        <MdArrowRight className="headerArrow"/>
                        <Select className='select' 
                                options={Teams} 
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
                                options={Teams} 
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
                    id="bannerLeft">
                <img src={bannerImgLeft} alt="upper team logo"/>
            </div>
            <div class="banner" 
                 ref={bannerRight} >
                <img src={bannerImgRight} alt="lower team logo"/>
            </div>
        </div>
    )
});

export default TradeContent;