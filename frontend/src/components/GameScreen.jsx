import React, { useEffect, useState, useRef } from "react";
import CardGallery from './CardGallery'
import './GameScreen.css'
import Stopwatch from "./Stopwatch";

export default function GameScreen({ level, setUser }) {

    const [score, setScore] = useState(0);
    const [responded, setResponded] = useState(false);
    let time = useRef; 

    async function handleClick() {
        const score = Math.max((1 / time.current) * level, 1);
        const res = await fetch(`https://dragon-memory.onrender.com/score`, {
            method: "put",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"score": score}),
            credentials: 'include',
        });
        const response = await res.json();
        setUser(response);
        setResponded(true);
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
                <h2 className="dbz-font score">Score: {time.current / (1/level)}</h2>
                <hr />
                {!responded ? <button onClick={handleClick}>Add score to leaderboard!</button> : <h2 className="dbz-font">Score added!</h2>}
                <hr />
                <form action="/"><button type="submit">Return to Home Screen</button></form>
            </div>)}
            {score == "Gameover!" && (
            <div className="controls">
                <h2>Gameover! Refresh the page to play again!</h2>
                <form action="/"><button type="submit">Return to Home Screen</button></form>
            </div>)}
        </>
    )
}