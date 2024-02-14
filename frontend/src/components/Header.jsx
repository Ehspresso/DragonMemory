import React from "react";
import { useState } from "react";
import "./Header.css";
import SigninForm from "./SigninForm";
import MuteButton from "./MuteButton";
import Leaderboard from "./Leaderboard";

export default function Header({ user, setUser }) {

    let [message, setMessage] = useState(null);

    return(
        <div className="header">
            <MuteButton />
            <h1 className="logo-container">
                <img id="logo-image" src="./assets/dragonball.png"></img>
                <span className="logo dbz-font" id="dragon">Dragon</span>
                <span className="logo dbz-font">Memory</span>
            </h1>
            <div className="right-container">
                {user == null ?
                    <SigninForm message={message} setMessage={setMessage} setUser={setUser} />
                    :
                    <>
                        <h1 className="username dbz-font">{user.username}</h1>
                        <Leaderboard />
                        <form method="post" action="http://localhost:3000/signout"><button type="submit">Sign Out</button></form>
                    </>}
            </div>
        </div>
    );
}