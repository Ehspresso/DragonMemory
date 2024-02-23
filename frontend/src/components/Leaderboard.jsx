import { useEffect, useState } from "react";
import "./Leaderboard.css";

export default function Leaderboard({ user }) {

    let [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await fetch('https://dragon-memory.onrender.com/scores');
            const data = await res.json();
            data.sort((a, b) => {a.score - b.score});
            setLeaderboard([...data]);
        }
        getData();
    }, [user]);

    return (
        <div className="leaderboard">
            <div className="leaderboard-header dbz-font">
                <span>Username</span>
                <span>Score</span>
            </div>
            <div className="leaderboard-scores">
                {leaderboard.map(item => {
                    return item.score && <div><span>{item.username}</span><span>{item.score}</span></div>
                })}
            </div>
        </div>
    );
}