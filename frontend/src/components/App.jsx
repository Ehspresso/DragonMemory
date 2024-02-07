import React from "react";
import { useRef, useState, useEffect } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import Header from "./Header";

export default function App() { 
    let [play, setPlay] = useState(false);
    let [level, setLevel] = useState("5");

    function handleLevel(level) {
        setLevel(level);
        setPlay(true);
    }

    return (
        <>
            <Header />
            {!play ? <StartScreen handleClick={handleLevel}/> : <GameScreen level={level}/>}
            <div style={{height: "90.875px"}}></div>
        </>
    )
}