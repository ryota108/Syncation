// import  { NextPage } from 'next'
import { useState } from "react";
import Timer from "../components/Timer";
import CountDownTimer from "../components/CountDownTimer";

const Home  = () => {
  
  const [targetTime, setTargetTime] = useState()
  
  const submitHandler  = (time) =>{
    setTargetTime(time)
  }

  return (
    <>
  <Timer onHelp ={submitHandler} />
  <CountDownTimer targetDate={targetTime} />
    </>
  )
}

export default Home
