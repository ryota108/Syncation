import { type } from 'os';
import React,{useState,useEffect} from 'react';
import classes from "./Timer.module.css";
import { useRecoilValue } from "recoil";
import {hostState} from "../recoil/atom"


// timestampの発行 オンクリックにある
// input =>追加分数を入れている
// 休憩したい時間分＝＞インターバルの引数 =>timestampの発行 <=初回のみ rest = true 

function Timer({onHelp}) {
  const [rest,setRest] = useState(false)
  const timer = useRecoilValue(hostState)
  // const [timer, setTimer] = useState("")
  const [startTime, setStartTime] = useState(new Date());
  const miliTime = timer.time * 60 * 1000 
  const testRest = miliTime + 5000

  
  const clickHandler = (e) => {
    if (timer === ""){
      return
    }
    const now = new Date()
    // 押した時間
    const test = now.getTime()
    setStartTime(new Date (test));
    // 押した時間のインスタンス
    const dateDemo = new Date (test)
    // 終了時間
    const min = dateDemo.setMinutes(dateDemo.getMinutes() + +timer.time )
    const result = new Date (min)
  
    // 開始時間
    
    const diff = result.getTime() - startTime.getTime();
    onHelp(min)
  }

 

  useEffect(() => {
    const interval = setInterval(() => {
      clickHandler()
    }, testRest);
  return () => clearInterval(interval);
  }, [testRest])
  


  //  開始時間と終了時間を基にタイマー作成
  const changeHandler = (event)=>{
    setTimer(event.target.value)
  }
  
  return (
  <div style={{marginTop:"5%",marginLeft:"40%"}}>
  <button onClick={clickHandler}>Start</button>
  </div>
  )
}

export default Timer