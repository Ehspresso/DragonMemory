import React, { useEffect, useState, useRef } from "react";
import CardGallery from './CardGallery'
import './GameScreen.css'
import Stopwatch from "./Stopwatch";

export default function GameScreen({ level, setUser }) {

    const [score, setScore] = useState(0);
    let time = useRef; 

    async function handleClick() {
        const score = time.current / (1/level);
        const res = await fetch(`https://dragon-memory.onrender.com/score`, {
            method: "put",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"score": score}),
            credentials: 'include',
        });
        const response = await res.json();
        setUser(response);
    }

    function setFinalTime(seconds) {
        time.current = seconds;
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
            <div className="controls">
                <button onClick={handleClick}>Add score to leaderboard!</button>
                <hr />
                <form action="/"><button type="submit">Return to Home Screen</button></form>
            </div>)}
            {score == "Gameover!" && <h2>Gameover! Refresh the page to play again!</h2>}
        </>
    )
}