import { useEffect, useState } from "react";
import './CardGallery.css'

export default function CardGallery({level, onclick}) {

    const [data, setData] = useState([]);
    const[selected, setSelected] = useState([]);

    useEffect(() => {
        console.log("useEffect triggered!");
        const fetchData = async () => {
            try {
                const response = await fetch("https://dragonball-api.com/api/characters");
                const data = await response.json();
                console.log("re-render by first fetch!")
    
                let planetData = [];
                if (level == 20) {
                    const planetResponse = await fetch("https://dragonball-api.com/api/planets");
                    planetData = await planetResponse.json();
                    console.log("re-render by second fetch!")
                }
                planetData.length === 0 ? setData(data.items) : setData([...data.items, ...planetData.items]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        console.log(onclick.score);
    }, [onclick.score]);

    const shuffledImages = data.sort(() => Math.random() - 0.5);
    const cards = shuffledImages.slice(0, level);

    function handleOnclick(e) {
        if(!selected.includes(e.target.src)) {
            onclick.handler(onclick.score+1);
            setSelected([...selected, e.target.src]);
        } else {
            onclick.handler("Gameover!");
        }
        setData(cards.sort(() => Math.random() - 0.5));
    }

    return(
        <div className="container">
            {cards.map(item => {
                return (<div
                key={cards.indexOf(item)}
                className="item-container" 
                style={{maxWidth: "9%"}} 
                onClick={handleOnclick}
                >
                    <img src={item.image} style={{width: "100%"}}></img>
                </div>
            );})}
        </div>
    )
}