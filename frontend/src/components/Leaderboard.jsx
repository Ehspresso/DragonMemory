import { useEffect, useState } from "react";
import "./Leaderboard.css";

export default function Leaderboard() {

    let [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await fetch('http://localhost:3000/scores');
            const data = await res.json();
            setLeaderboard([...data], leaderboard.sort((a, b) => {a.score - b.score}));
        }
        getData();
    }, []);

    return (
        <div className="leader-btn">
            <button>Leaderboard</button>
            <ul className="leaderboard">
                {leaderboard.map(item => {return <li><p>{item.username}</p><p>{item.score}</p></li>})}
            </ul>
        </div>
    );
}