import { type } from 'os';
import React,{useState,useEffect, useContext} from 'react';
import classes from "./Timer.module.css";
import { useRecoilValue,useSetRecoilState, useRecoilState } from "recoil";
import {hostState, initialState, isRestingState, roomState,isVotingState, voteMinState} from "../recoil/atom"
import { SocketContext } from '../context/SocketProvider';


// timestampの発行 オンクリックにある
// input =>追加分数を入れている
// 休憩したい時間分＝＞インターバルの引数 =>timestampの発行 <=初回のみ rest = true 

// 問題
// 1undefinged 25行目


function Timer({onHelp, fetchVoteResting}) {
  const isResting = useRecoilValue(isRestingState)
  const restTime = useRecoilValue(voteMinState)
  const timer = useRecoilValue(roomState)   // roomInfoの情報
  const setRoomInfo = useSetRecoilState(roomState)
  const socket = useContext(SocketContext)
  const [voteDone,setVoteDone] = useRecoilState(isVotingState)
  const timeHandler = (time) => {
    const now = new Date()
    const test = now.getTime()
    const dateDemo = new Date (test)
    const min = dateDemo.setMinutes(dateDemo.getMinutes() + Number(time) )
    return min
  }
  
  const clickHandler = (e) => {
    if (timer === ""){
      return
    }

    const min = timeHandler(Number(timer.timer))

    fetch(`http://localhost:8000/room/${timer.id}`)
    .then(res => res.json())
    .then(res => {
      res.milisecond = String(min)
      // console.log(res)

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(res)
      }

      return fetch(`http://localhost:8000/room/${timer.id}`, requestOptions)
    })
    .then(res => res.json())
    .then(res => { 
      console.table(res)
      onHelp(res.milisecond)
      // minをルーム内にいる人に送信する　＋　ミリセカンドの上書き
      socket.emit("send_time", {
        "type": "startTime",
        "time": String(res.milisecond),
        "roomId": timer.id
      })
    })
    .catch(err => console.log(err))
  }

 

  

useEffect(() => {
  if(isResting.isResting === false){
    return ()=>{}
  }
  const isMode = timer.mode;
  const syncTimeHandler = (additionalTime)=>{
    console.log("休憩"+ additionalTime + "ワーキング" + Number(timer.timer))
    const sum = additionalTime + Number(timer.timer)
    console.log("合計" + sum)
    const milisecond = timeHandler(String(sum))
    console.log(milisecond)
    fetch(`http://localhost:8000/room/${timer.id}`)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      res.milisecond = String(milisecond)
      console.log(res)
    
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(res)
      }
    
      return fetch(`http://localhost:8000/room/${timer.id}`, requestOptions)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
       onHelp(res.milisecond)
      })
    .catch(err => console.log(err))
    }
    
  if(isMode === "VOTE"){
    const voteStateChangeHandler = () => {
      setVoteDone({...voteDone, isVoting:!voteDone.isVoting})
    }
    voteStateChangeHandler()
     const fetchVoteResult = () =>{
     return fetch(`http://localhost:8000/room/${timer.id}/vote/${timer.turn}`)
        .then(res=>res.json())
        .then(res => {
          console.log(res)
          setVoteDone({...voteDone, "vote_time_list": res.vote_time_list})
          syncTimeHandler(Number(res.res_time))})
    } 
    
    const sleep = (waitSeconds) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("setTimeout関数実行")
          voteStateChangeHandler()
          resolve()
        }, waitSeconds * 1000)
      })	
    }

    sleep(15)
    .then(() => {
      console.log("これからPOST実行")
      // return fetchVoteResting(restTime)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            "time": String(2),
            "room_id": timer.id,
            "rest_flag": true,
            "turn": timer.turn
          }
        )};
        
      return fetch(`http://localhost:8000/room/${timer.id}/vote/${timer.turn}`, requestOptions)
    })
    .then((res)=> {
      console.log(res)
      setVoteDone({...voteDone, isVoting: false})
      console.log("これからGET実行")
      return fetchVoteResult()
    })
    .then(() => setRoomInfo({...timer, turn: timer.turn + 1}))
    // sleep(20, fetchVoteResult)
    // .then(() => setRoomInfo({...timer, turn: timer.turn + 1}))
    }else if(isMode === "REST"){
     syncTimeHandler(Number(timer.restTime))
    } else if(isMode === "NO_REST") {
      console.log("elseが実行")
      syncTimeHandler(0)}
}, [isResting.isResting])

// timeHandler(timer.timer + additionalTime) =>min =>GET =>PUT => PUTのレスポンスを基にonHelp(res.min) 
// 
// 
//

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
  //      timerHandler()
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