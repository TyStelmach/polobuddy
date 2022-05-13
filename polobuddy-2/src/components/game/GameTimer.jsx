import React, { useEffect, useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { getCurrentUnix, preformatTimerDigits } from '../../libs/utilities';


const Timer = ({ endsOn, isPaused }) => {
  const [timeLeft, setTimeLeft] = useState({
    minutes: '--',
    seconds: '--'
  });
  const [diff, setDiff] = useState(0);
  const [timerFrozen, setTimerFrozen] = useState(null);

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

  const setTimerDiff = () => {
    setDiff(new Date(endsOn) - getCurrentUnix());
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }

  useEffect(() => {
    setTimerDiff();
  }, [timeLeft]);

  const timerComponents = [];
  
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
  });

  if (isPaused) {
    timerComponents.push(
      <span>PAUSED</span>
    )
  } else {
    if (timeLeft?.minutes || timeLeft?.seconds) {
      timerComponents.push(
        <span>
          {preformatTimerDigits(timeLeft.minutes)}
          :
          {preformatTimerDigits(timeLeft.seconds)}
        </span>
      );
    }
  }

  return(
    <div>
      {timerComponents.length ? timerComponents : <span>Beer Point!</span>}
    </div> 
  );
}

export default Timer;