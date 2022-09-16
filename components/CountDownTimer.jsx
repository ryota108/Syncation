import React,{useState} from 'react';
import { useClock } from "../hooks/useClock";
import ShowCounter from "./ShowCounter";
import { useSetRecoilState,useRecoilValue } from 'recoil';
import { isStudyingState } from '../recoil/atom';
import StopNotification from './StopNotification';

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useClock(targetDate);  
  if (days + hours + minutes + seconds == 0) {
    return (
    <>
    <StopNotification/>
    <ShowCounter
    days={days}
    hours={hours}
    minutes={minutes}
    seconds={seconds}
  />
    </>);
  } else if (days + hours + minutes + seconds <= -3){
    return (
      <>
      <StopNotification/>
      <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
      </>);
  }
  else {
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