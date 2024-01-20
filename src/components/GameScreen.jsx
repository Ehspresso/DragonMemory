import { useEffect, useState } from "react";
import CardGallery from './CardGallery'
import './GameScreen.css'

export default function GameScreen({level}) {

    const [score, setScore] = useState(0);

    return (
        <>
            {score != "Gameover!" && score != 5 && (
                <>
                    <h2>Score: {score}/5</h2>
                    <CardGallery level={level} onclick={{score: score, handler: setScore}}/>
                </>)}
            
            {score == 5 && <h2>You win! Refresh the page to play again!</h2>}
            
            {score == "Gameover!" && <h2>Gameover! Refresh the page to play again!</h2>}
        </>
    )
}