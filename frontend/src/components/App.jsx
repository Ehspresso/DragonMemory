import React from "react";
import { useRef, useState, useEffect } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import Header from "./Header";

export default function App() { 
    let [play, setPlay] = useState(false);
    let [level, setLevel] = useState("5");
    let [user, setUser] = useState(null);

    function handleLevel(level) {
        setLevel(level);
        setPlay(true);
    }

    return (
        <>
            <Header user={user} setUser={setUser} />
            {!play ? <StartScreen handleClick={handleLevel}/> : <GameScreen level={level} user={user}/>}
            <div style={{maxHeight: "90.875px", height: "100%"}}></div>
        </>
    )
}