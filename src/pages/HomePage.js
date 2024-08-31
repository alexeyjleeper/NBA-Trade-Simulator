import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Reset from '../components/Reset.js';
import HomeNav from '../components/HomeNav.js';
import { MdArrowForwardIos } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';

function HomePage({uuid}) {
    const isMobile = useMediaQuery({maxWidth: 768});
    const containerRef = useRef(null);
    const [cursorPos, setCursorPos] = useState({x: 0, y: 0})
                    
    const navigate = useNavigate();
    function navTrade () {
        navigate('/trade');
    }
    function navSearch () {
        navigate('/rosters');
    }
    
    function handleMouseMove (event) {
        const { clientX: x, clientY: y} = event;
        setCursorPos({x, y});
    }

    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            container.addEventListener('mousemove', handleMouseMove);

            return () => {
                container.removeEventListener('mousemove', handleMouseMove);
            }
        }
    });

    // initialization rule is written over if mobile
    let bgPos = {backgroundPosition: '70% center'};
    if (!isMobile)
        bgPos = {
            backgroundPosition: `${cursorPos.x * -0.02}px ${cursorPos.y * -0.02}px`,
        };

    return(
        <div id='homePage' ref={containerRef} style={{...bgPos}}>
            <div className='navButtons'>
                <HomeNav/>
                <Reset uuid={uuid}/>
            </div>
            <div className='homeNavButton'
                 id='tradeBuilderButton'
                 onClick={navTrade}>
                <p>Trade Builder</p>
                <MdArrowForwardIos id='tbArrow'/>
            </div>
            <div className='homeNavButton'
                 id='viewRostersButton'
                 onClick={navSearch}>
                <p>View Rosters</p>
                <MdArrowForwardIos id='vrArrow'/>
            </div>
        </div>
    );
}

export default HomePage;