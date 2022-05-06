import React, { useEffect, useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { getCurrentUnix, preformatTimerDigits } from '../../libs/utilities';


const Timer = ({ endsOn, duration }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [diff, setDiff] = useState('');

  const calculateTimeLeft = () => {
    let timeLeft = {};
    if (diff > 0) {
      timeLeft = {
        minutes: Math.floor((diff / 1000 / 60) % 60) || '00',
        seconds: Math.floor((diff / 1000) % 60) || '00',
      };
    } 

    return timeLeft;
  }

  useEffect(() => {
    setDiff(new Date(endsOn) - getCurrentUnix());
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);

  });

  const timerComponents = [];
  
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
  });

  timerComponents.push(
    <span>
      {preformatTimerDigits(timeLeft.minutes)}
      :
      {preformatTimerDigits(timeLeft.seconds)}
    </span>
  );

  return(
    <div>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div> 
  );
}

export default Timer;