import React, {useRef} from 'react'
import {hostState} from '../recoil/atom'
import Router from "next/router"
import {useRecoilValue, useSetRecoilState} from "recoil"

function launchRoom() {
  const host = useRecoilValue(hostState);
  const setHost = useSetRecoilState(hostState);
  const hostNameRef = useRef(null);
  const timeRef = useRef(null)

  const hostSubmitHandle = () =>{
    const roomId = new Date().getTime().toString(16)  + Math.floor(Math.random()).toString(16)
    setHost({hostName:hostNameRef.current.value,roomId:roomId, time: timeRef.current.value})
    Router.push(`/rooms/${roomId}`)
   }

   const formHandle = (e) =>{
    e.preventDefault()
  }

   

  return (
    <>
    <h1>ルームを作成する</h1>
  <form onSubmit={formHandle}>
   <label >Host <input ref={hostNameRef}/></label>
   <label >Time <input ref={timeRef}/></label>
   <button onClick={hostSubmitHandle}>Submit</button>
  </form>
  </>
  )
}

export default launchRoom