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

        sounds.forEach(el => {
            el.muted = !muted;
        });
        setMuted(!muted);
        setVolume(muted ? mdiVolumeHigh : mdiVolumeOff);
    }

async function handleSubmit(e) {
    e.preventDefault();
    const url = e.nativeEvent.submitter.value;
    const data = new FormData(e.target);
    const res = await fetch(`http://localhost:3000/${url}`, {
        method: "post",
        body: data
        });
    console.log(res.json());
}

    return(
        <div className="header">
            <div className="mute-button" onClick={mute}>
                <Icon className="mute-icon" path={volume} size={2} color={"red"}/>
                <audio id="sound-startup">
                    <source src="./assets/sound-startup.mp3"/>
                </audio>
                <audio id="sound-select">
                    <source src="./assets/sound-select.mp3"/>
                </audio>
            </div>
            <h1 className="logo-container">
                <img id="logo" src="./assets/dragonball.png"></img>
                <span id="dragon">Dragon</span>
                <span>Memory</span>
            </h1>
            <div className="signin-container">
            <form className="signin">
                    <input className="signin" type="text" name="username" placeholder="username" required></input>
                    <input className="signin" type="text" name="password" placeholder="password" required></input>
                    <button className="signin" type="submit" name="action" value="login">Login</button>
                    <button className="signin" type="submit" name="action2" value="signup">Signup</button>
            </form>
            </div>
        </div>
    );
}