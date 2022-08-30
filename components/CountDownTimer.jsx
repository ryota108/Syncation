import React from 'react';
import { useClock } from "../hooks/useClock";
import ShowCounter from "./ShowCounter";
import { useSetRecoilState,useRecoilValue } from 'recoil';
import { isStudyingState } from '../recoil/atom';

const CountdownTimer = ({ targetDate,helpHandler }) => {
  const [days, hours, minutes, seconds] = useClock(targetDate);
  
  if (days + hours + minutes + seconds == 0) {
    helpHandler(true)
   return  (<ShowCounter
   days={0}
   hours={0}
   minutes={0}
   seconds={0}
 />);
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};
export default CountdownTimer;