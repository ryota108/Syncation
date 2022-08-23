import React from 'react';
import { useClock } from "../hooks/useClock";
import ShowCounter from "./ShowCounter";

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useClock(targetDate);

  if (days + hours + minutes + seconds == 0) {
    // マイナスで終わらないからuseClockに処理の追加が必要です
   window.alert("Finish")
   return;
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