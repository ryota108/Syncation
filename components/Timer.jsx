import { type } from 'os';
import React,{useState,useEffect, useContext} from 'react';
import classes from "./Timer.module.css";
import { useRecoilValue,useSetRecoilState } from "recoil";
import {hostState, initialState, isRestingState, roomState} from "../recoil/atom"
import { SocketContext } from '../context/SocketProvider';


// timestampの発行 オンクリックにある
// input =>追加分数を入れている
// 休憩したい時間分＝＞インターバルの引数 =>timestampの発行 <=初回のみ rest = true 


function Timer({onHelp}) {
  const SETTING = "NO_REST";
  const setting_rest = 2;
  const isResting = useRecoilValue(isRestingState)
  const timer = useRecoilValue(roomState)
  const [startTime, setStartTime] = useState(null);
  const miliTime = timer.time * 60 * 1000 
  const random = Math.floor(Math.random()*11)
  const testRest = miliTime + random * 100
  const initial = useRecoilValue(initialState);
  const setInitial = useSetRecoilState(initialState);
  const socket = useContext(SocketContext)

  const timeHandler = (time) => {
    const now = new Date()
    const test = now.getTime()
    setStartTime(new Date (test));
    const dateDemo = new Date (test)
    const min = dateDemo.setMinutes(dateDemo.getMinutes() + +time )
    return min
  }
  
  const clickHandler = (e) => {
    if (timer === ""){
      return
    }

    const min = timeHandler(timer.timer)
    console.log(min)

    
    // minをルーム内にいる人に送信する　＋　ミリセカンドの上書き
    socket.emit("send_time", {
      "type": "startTime",
      "time": String(min),
      "roomId": timer.id
    })

    fetch(`http://localhost:8000/room/${timer.id}`)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      res.milisecond = String(min)
      console.log(res)

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(res)
      }

      return fetch(`http://localhost:8000/room/${timer.id}`, requestOptions)
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))

    console.log("clickHandler"+ timer.timer);
    setInitial({isInitial:false})
    onHelp(min)
  }

 
// if(SETTING === "NO_RES"){
//   useEffect(() => {
//     const interval = setInterval(() => {
//       clickHandler()
//     }, testRest);
    
//   return () => clearInterval(interval);
//   }, [testRest])
// }


  // useEffect(() => {
  //   if( isResting.isResting && initial.isInitial){
  //       const now = new Date()
  //       const test = now.getTime()
  //       setStartTime(new Date (test));
  //       const dateDemo = new Date (test)
  //       const min = dateDemo.setMinutes(dateDemo.getMinutes() + +timer.time )
  //       onHelp(min)
  //     return () => {}
  //   }  else {
  //   const now = new Date()
  //   const test = now.getTime()
  //   const dateDemo = new Date (test)
  //   const min = dateDemo.setMinutes(dateDemo.getMinutes() + setting_rest )
  //   onHelp(min)
  //   return ()=>{}
  // }
  // },[isResting.isResting])


  
  


  //  開始時間と終了時間を基にタイマー作成
  const changeHandler = (event)=>{
    setTimer(event.target.value)
  }
  
  return (
    <>
    <div className="btn blue timerBtn" onClick={clickHandler}>
            <p>Start</p>
          </div>
          </>
  /* <button onClick={clickHandler}>Start</button> */
  )
}

export default Timer