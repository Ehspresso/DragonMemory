import React from "react";
import { useRef, useState, useEffect } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import Header from "./Header";
import Leaderboard from "./Leaderboard";

export default function App() { 
    let [play, setPlay] = useState(false);
    let [level, setLevel] = useState("5");
    let [user, setUser] = useState(null);
    let [leaderboardClicked, setLeaderboardClicked] = useState(false);

    function handleLevel(level) {
        setLevel(level);
        setPlay(true);
    }

    function handleClick() {
        setLeaderboardClicked(!leaderboardClicked);
    }

    return (
        <>
            <Header userState={{ "user": user, "setUser": setUser }} handleClick={handleClick}/>
            {leaderboardClicked ? <Leaderboard /> :
            !play ? <StartScreen handleClick={handleLevel}/> : <GameScreen level={level} setUser={setUser}/>}
            <div style={{maxHeight: "90.875px", height: "100%"}}></div>
        </>
    )
}