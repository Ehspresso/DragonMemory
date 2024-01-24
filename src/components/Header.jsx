import React from "react";
import { useRef, useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdiVolumeHigh, mdiVolumeOff } from '@mdi/js';
import "./Header.css"

export default function Header() {

    let [muted, setMuted] = useState(false);
    let [volume, setVolume] = useState(mdiVolumeHigh);

    function mute() {
        const sounds = document.querySelectorAll("audio");
        console.log(sounds);

        sounds.forEach(el => {
            el.muted = !muted;
        });
        setMuted(!muted);
        setVolume(muted ? mdiVolumeHigh : mdiVolumeOff);
    }

    return(
        <div className="header">
            <div className="icon" onClick={mute}>
                <Icon path={volume} size={2} color={"red"} style={{padding: "10px"}}/>
                <audio id="sound-startup">
                    <source src="public/assets/sound-startup.mp3"/>
                </audio>
                <audio id="sound-select">
                    <source src="public/assets/sound-select.mp3"/>
                </audio>
            </div>
            <h1 className="logo-container">
                <img id="logo" src="public/assets/dragonball.png"></img>
                <span id="dragon">Dragon</span>
                <span>Memory</span>
            </h1>
            <div style={{width: "90.875px"}} className="placeholder"></div>
        </div>
    );
}