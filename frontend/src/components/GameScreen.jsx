import React, { useEffect, useState, useRef } from "react";
import CardGallery from './CardGallery'
import './GameScreen.css'
import Stopwatch from "./Stopwatch";

export default function GameScreen({level, user}) {

    const [score, setScore] = useState(0);
    let time = useRef; 

    async function handleClick() {
        const requestOptions = {
            method: 'PUT',
            body: time};
        const res = await fetch('http://localhost:3000/add', requestOptions)
    }

    function setFinalTime(seconds) {
        time.current = seconds;
        console.log(time.current);
    }

    return (
        <>
            {score != "Gameover!" && score != level && (
                <div className="game-content">
                    <p className="time dbz-font"><b>Time: <Stopwatch callback={setFinalTime}/></b></p>
                    <h2 className="dbz-font score">Score: {score}/{level}</h2>
                    <CardGallery level={level} onclick={{score: score, handler: setScore}}/>
                </div>)}
            
            {score == level && (
            <button onClick={handleClick}>Add score to leaderboard!</button>)}
            
            {score == "Gameover!" && <h2>Gameover! Refresh the page to play again!</h2>}
        </>
    )
}