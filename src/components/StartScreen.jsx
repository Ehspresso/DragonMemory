import { useState } from "react";
import './StartScreen.css';
import { TypeAnimation } from 'react-type-animation';

export default function StartScreen({handleClick}) {

    const [visible, setVisible] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        for(let input of e.target) {
            if(input.checked) {
                handleClick(input.value);
                break;
            }
        }
    }

    return(
        <>
            <div className="wrapper">
                <TypeAnimation
                    sequence={[
                        "Choose a level:",
                        () => {setVisible(true)}
                    ]}
                    className="level-animation"
                    style={{fontSize: '3em'}}
                />
                {visible && (
                <form className="levels" onSubmit={handleSubmit}>
                    <label><input className="level" name="level" type="radio" value="5" /><img src="src/assets/dragonball.png" style={{height: "15px", width: "15px"}}></img>Easy</label>
                    <label><input className="level" name="level" type="radio" value="10" /><img src="src/assets/dragonball.png" style={{height: "15px", width: "15px"}}></img>Medium</label>
                    <label><input className="level" name="level" type="radio" value="20" /><img src="src/assets/dragonball.png" style={{height: "15px", width: "15px"}}></img>Hard</label>
                    <br />
                    <button type="submit">Start Game</button>
                </form>)}
            </div>
        </>
    )
}