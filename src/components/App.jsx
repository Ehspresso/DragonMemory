import { useRef, useState, useEffect } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import Icon from '@mdi/react';
import { mdiVolumeHigh, mdiVolumeOff } from '@mdi/js';

export default function App() { 
    let [play, setPlay] = useState(false);
    let [level, setLevel] = useState("5");
    let [muted, setMuted] = useState(false);
    let [volume, setVolume] = useState(mdiVolumeHigh);

    function handleLevel(level) {
        setLevel(level);
        setPlay(true);
    }

    function mute() {
        const sounds = document.querySelectorAll("audio");
        console.log(sounds);

        sounds.forEach(el => {
            el.muted = !muted;
        });
        setMuted(!muted);
        setVolume(muted ? mdiVolumeHigh : mdiVolumeOff);
    }

    function Header() {
        return(
            <div className="header">
                <div className="icon" onClick={mute}>
                    <Icon path={volume} size={2} color={"red"} style={{padding: "10px"}}/>
                    <audio id="sound-startup">
                        <source src="src/assets/sound-startup.mp3"/>
                    </audio>
                    <audio id="sound-select">
                        <source src="src/assets/sound-select.mp3"/>
                    </audio>
                </div>
                <h1 className="logo-container">
                    <img id="logo" src="src/assets/dragonball.png"></img>
                    <span id="dragon">Dragon</span>
                    <span>Memory</span>
                </h1>
                <div style={{width: "90.875px"}} className="placeholder"></div>
            </div>
        );
    }

    return (
        <>
            <Header />
            {!play ? <StartScreen handleClick={handleLevel}/> : <GameScreen level={level}/>}
        </>
    )
}