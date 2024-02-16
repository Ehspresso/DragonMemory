import { useEffect, useState } from "react";
import "./Leaderboard.css";

export default function Leaderboard({ user }) {

    let [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await fetch('https://dragon-memory.onrender.com/scores');
            const data = await res.json();
            setLeaderboard([...data], leaderboard.sort((a, b) => {a.score - b.score}));
        }
        getData();
    }, [user]);

    return (
        <button className="leader-btn">
            <ul className="leaderboard">
                {leaderboard.map(item => {
                    if(item.score != null) {
                        return (<li><p>{item.username} {item.score}</p></li>);
                    } else {
                        return;
                    }
                })}
            </ul>
        </button>
    );
}