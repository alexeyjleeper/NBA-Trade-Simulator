import Select from 'react-select';
import React, {useState, useEffect, forwardRef} from 'react';

const assetSelectStyles = {
    menu: (provided) => ({
        ...provided,
        margin: 0,
        borderRadius: 0
    }),
    menuList: (provided) => ({
        ...provided
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white'
    }),
    option: (provided) => ({
        ...provided,
        color: 'black',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        padding: '5px'
    }),
    control: (provided, state) => ({
        ...provided,
        width: '100%',
        background: 'white',
        color: 'black',
        boxShadow: 'none',
        borderColor: state.isFocused ? 'transparent' : 'transparent',
        cursor: 'pointer',
        '&:hover': {
            borderColor: 'transparent',
            cursor: 'select'
        },
        borderRadius: 0
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: state.selectProps.menuIsOpen ? '#363636' : '#575757'
      }),  
    input: (provided) => ({
        ...provided,
        caretColor: 'transparent'
    }),      
    placeholder: (provided) => ({
        ...provided,
        color: 'black',
        fontFamily: 'Montserrat',
        whiteSpace: 'nowrap',
        fontWeight: '450'
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none'
    })
}

const AssetSelect = forwardRef(({topAssets, bottomAssets, currList, addToList}, ref) => {
    // gonna need to pass currList, function to add to top, function
    // to add to bottom, array of players, array of picks, also need 
    // to set opacity to 0 after click
    const [players, setPlayers] = useState([]);
    const [picks, setPicks] = useState([]);
    const playersList = [];
    const picksList = [];

    useEffect(()=> {
        let loadPlayers = [];
        let loadPicks = [];
        if (currList === "top") {
            loadPlayers = topAssets[0][0];
            loadPicks = topAssets[1][0];
        } else if (currList === "bottom") {
            loadPlayers = bottomAssets[0][0];
            loadPicks = bottomAssets[1][0];
        }

        // this method, opposed to directly loading in topAssets, works better
        // with react's method of detecting changes in state
        setPlayers(loadPlayers);
        setPicks(loadPicks);
    }, [currList, topAssets, bottomAssets]);

    useEffect(() => {
        if (players) {
            players.forEach(player => playersList.push({ label: `${player}`, value: `${player}` }));
        }
    }, [players]);

    useEffect(() => {
        if (picks) {
            picks.forEach(pick => {
                let content = `${pick[0]}`;
                if (pick[2] == "U") {
                    content += " Unprotected";
                } else {
                    content += " Protected";
                }
                if (pick[1] == "1") {
                    content += " 1st Rnd Pick";
                } else {
                    content += " 2nd Rnd Pick";
                }
                picksList.push({ label: `${content} `, value: `${pick}` });
            });
        }
    }, [picks])
    
    return(
        <div id="overlay" ref={ref}>
            <div id="assetSelectContainer">
                <Select className="assetSelect" 
                        styles={assetSelectStyles} 
                        placeholder="Players"
                        options={playersList}
                        onChange={addToList}/>
                <Select className="assetSelect" 
                        styles={assetSelectStyles} 
                        placeholder="Draft Picks"
                        options={picksList}
                        onChange={addToList}/>
            </div>
        </div>
    );
});

export default AssetSelect;