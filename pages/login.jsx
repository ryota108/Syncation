import React , {useRef} from 'react'
import classes from "../styles/login.module.css";
import Router from "next/router"
import {useRecoilValue,useSetRecoilState} from "recoil"
import {userState} from '../recoil/atom'


function login() {

  const test = useRecoilValue(userState);

  const setTest = useSetRecoilState(userState);

  const userRef = useRef(null)
  const roomRef = useRef(null)

 
  const submitHandle = ()=>{
    // context でグローバル化にする
    setTest([...test ,{id:1,userName:userRef.current.value,progress:0}])
    Router.push(`/rooms/${roomRef.current.value}`)
  }
  const formHandle = (e) =>{
  e.preventDefault()
}

  return (
    <div>    
      <h1>ルームに参加する</h1>
      <form onSubmit={formHandle} className={classes.loginModal}>
     <label className={classes.loginInput}>Room ID <input ref={roomRef}/></label>
     <label className={classes.loginInput}>User Name <input ref={userRef}/></label>
     <button onClick={submitHandle}>Submit</button>
     </form>
    </div>
  )
}

export default login