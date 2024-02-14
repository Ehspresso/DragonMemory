import { useEffect, useState } from "react";

export default function Stopwatch({ callback }) {

    const [time, setTime] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
  
      // Cleanup function to clear the interval when the component unmounts
      return () => {
        clearInterval(interval);
    }
    }, []);

    useEffect(() => {
        callback(time);
    }, [time]);

    return <span>{time}</span>
}