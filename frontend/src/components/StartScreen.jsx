import React from "react";
import { useState } from "react";
import './StartScreen.css';
import { TypeAnimation } from 'react-type-animation';

export default function StartScreen({handleClick}) {

    const [visible, setVisible] = useState(false);
    const [sound, setSound] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        for(let input of e.target) {
            if(input.checked) {
                handleClick(input.value);
                break;
            }
        }
    }

    function handleOptionClick() {
        if(!sound) {
            const audio = document.querySelector("#sound-startup");
            audio.play();
            setSound(true);
        }
    }

    return(
        <>
            <div className="dbz-font wrapper">
                <TypeAnimation
                    sequence={[
                        "Choose a level:",
                        () => {setVisible(true)}
                    ]}
                    className="level-animation"
                    style={{fontSize: '1em'}}
                />
                {visible && (
                <form className="dbz-font levels" onSubmit={handleSubmit}>
                    <label><input onClick={handleOptionClick} className="level" name="level" type="radio" value="5" /><img src="./assets/dragonball.png" style={{height: "15px", width: "15px"}}></img>Easy</label>
                    <label><input onClick={handleOptionClick} className="level" name="level" type="radio" value="10" /><img src="./assets/dragonball.png" style={{height: "15px", width: "15px"}}></img>Medium</label>
                    <label style={{marginRight: "20px"}}><input onClick={handleOptionClick} className="level" name="level" type="radio" value="20" /><img src="./assets/dragonball.png" style={{height: "15px", width: "15px"}}></img>Hard</label>
                    <br />
                    <button className="dbz-font" type="submit">Start Game</button>
                </form>)}
            </div>
        </>
    )
}