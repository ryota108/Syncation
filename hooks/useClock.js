import { useEffect, useState, y } from 'react';

const useClock = (targetDate) => {

  const [countDown, setCountDown] = useState(
    targetDate - new Date().getTime()
  );

  useEffect(() => {
  if(countDown <= 1000){
    return getReturnValues(0)
  }else {
    const interval = setInterval(() => {
      setCountDown(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);}
  }, [targetDate,countDown]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export  {useClock};