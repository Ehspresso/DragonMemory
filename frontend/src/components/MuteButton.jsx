import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiVolumeHigh, mdiVolumeOff } from '@mdi/js';
import "./MuteButton.css"

export default function MuteButton() {

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

    return (
        <div className='mute-button' onClick={mute}>
            <Icon className="mute-icon" path={volume} size={2} color={"red"}/>
            <audio id="sound-startup">
                <source src="./assets/sound-startup.mp3"/>
            </audio>
            <audio id="sound-select">
                <source src="./assets/sound-select.mp3"/>
            </audio>
        </div>
    );
}