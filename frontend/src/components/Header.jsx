import React, { useEffect } from "react";
import { useState } from "react";
import "./Header.css";
import SigninForm from "./SigninForm";
import MuteButton from "./MuteButton";
import Leaderboard from "./Leaderboard";

export default function Header({ userState, handleClick }) {

    let [message, setMessage] = useState(null);

    async function handleLogout(e) {
        localStorage.clear();
    }

    return(
        <div className="header">
            <MuteButton />
            <h1 className="logo-container">
                <img id="logo-image" src="./assets/dragonball.png"></img>
                <span className="logo dbz-font" id="dragon">Dragon</span>
                <span className="logo dbz-font">Memory</span>
            </h1>
            <div className="right-container">
            <button onClick={handleClick}>Leaderboard</button>
                {userState.user == null ?
                    <SigninForm message={message} setMessage={setMessage} setUser={userState.setUser} />
                    :
                    <>
                        <h1 className="username dbz-font">{userState.user.username}</h1>
                        <form method="post" action="https://dragon-memory.onrender.com/logout"><button type="submit" onClick={handleLogout}>Log Out</button></form>
                    </>}
            </div>
        </div>
    );
}