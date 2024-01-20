import { useRef, useState } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";

export default function App() { 
    let [play, setPlay] = useState(false);
    let [level, setLevel] = useState("5");

    function handleLevel(level) {
        setLevel(level);
        setPlay(true);
    }

    return (
        <>
            <h1>
                <img className="logo" src="src/assets/dragonball.png"></img>
                <span className="dragon">Dragon</span>
                <span>Memory</span>
            </h1>
            {!play ? <StartScreen handleClick={handleLevel}/> : <GameScreen level={level}/>}
        </>
    )
}